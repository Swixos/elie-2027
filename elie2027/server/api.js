const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'messages.json');
const MAX_ENTRIES = 50;
const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 2000;

app.use(cors());
app.use(express.json({ limit: '10kb' }));

function readMessages() {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeMessages(messages) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2), 'utf-8');
}

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

// GET all messages
app.get('/api/messages', (_req, res) => {
  const messages = readMessages().map(msg => ({
    name: sanitize(msg.name),
    message: sanitize(msg.message),
    date: msg.date,
  }));
  res.json(messages);
});

// POST a new message
app.post('/api/messages', (req, res) => {
  const { name, message } = req.body;

  if (!name || !message || typeof name !== 'string' || typeof message !== 'string') {
    return res.status(400).json({ error: 'name et message requis' });
  }

  const sanitizedName = sanitize(name).slice(0, MAX_NAME_LENGTH);
  const sanitizedMessage = sanitize(message).slice(0, MAX_MESSAGE_LENGTH);

  if (!sanitizedName || !sanitizedMessage) {
    return res.status(400).json({ error: 'Contenu invalide après sanitization' });
  }

  const entry = {
    name: sanitizedName,
    message: sanitizedMessage,
    date: new Date().toISOString(),
  };

  const messages = readMessages();
  messages.unshift(entry);

  if (messages.length > MAX_ENTRIES) {
    messages.length = MAX_ENTRIES;
  }

  writeMessages(messages);
  res.status(201).json(entry);
});

app.listen(PORT, () => {
  console.log(`Contact API running on http://localhost:${PORT}`);
});
