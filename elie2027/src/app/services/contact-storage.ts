import { Injectable } from '@angular/core';
import DOMPurify from 'dompurify';

export interface ContactMessage {
  name: string;
  message: string;
  date: string;
}

const STORAGE_KEY = 'elie2027_contacts';
const MAX_ENTRIES = 50;

@Injectable({ providedIn: 'root' })
export class ContactStorageService {

  private sanitize(value: string): string {
    return DOMPurify.sanitize(value, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim();
  }

  save(name: string, message: string): void {
    const entry: ContactMessage = {
      name: this.sanitize(name),
      message: this.sanitize(message),
      date: new Date().toISOString(),
    };

    const messages = this.loadRaw();
    messages.unshift(entry);

    if (messages.length > MAX_ENTRIES) {
      messages.length = MAX_ENTRIES;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }

  getAll(): ContactMessage[] {
    return this.loadRaw().map(msg => ({
      name: this.sanitize(msg.name),
      message: this.sanitize(msg.message),
      date: msg.date,
    }));
  }

  private loadRaw(): ContactMessage[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return [];
      return parsed;
    } catch {
      return [];
    }
  }
}
