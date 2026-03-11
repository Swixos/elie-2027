import { Component, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvisComponent } from '../avis/avis';
import { DownloadService } from '../../services/download';
import { ContactStorageService, ContactMessage } from '../../services/contact-storage';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, AvisComponent],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnInit {

  constructor(
    private downloadService: DownloadService,
    private contactStorage: ContactStorageService,
  ) {}

  name = signal('');
  email = signal('');
  message = signal('');
  submitted = signal(false);
  messages = signal<ContactMessage[]>([]);

  ngOnInit() {
    this.loadMessages();
  }

  onSubmit() {
    this.contactStorage.save(this.name(), this.message()).subscribe({
      next: () => {
        this.submitted.set(true);
        this.name.set('');
        this.email.set('');
        this.message.set('');
        this.loadMessages();
        setTimeout(() => this.submitted.set(false), 4000);
      },
      error: () => {
        this.submitted.set(true);
        setTimeout(() => this.submitted.set(false), 4000);
      },
    });
  }

  downloadGif() {
    this.downloadService.download('/Merci.gif', 'Merci.gif');
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  private loadMessages() {
    this.contactStorage.getAll().subscribe(msgs => this.messages.set(msgs));
  }
}
