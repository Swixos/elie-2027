import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvisComponent } from '../avis/avis';
import { DownloadService } from '../../services/download';
@Component({
  selector: 'app-contact',
  imports: [FormsModule, AvisComponent],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {

  constructor(private downloadService: DownloadService) { }

  name = signal('');
  email = signal('');
  message = signal('');
  submitted = signal(false);

  onSubmit() {
    this.submitted.set(true);
    this.name.set('');
    this.email.set('');
    this.message.set('');
    setTimeout(() => this.submitted.set(false), 4000);
  }

  downloadGif() {
    this.downloadService.download('/Merci.gif', 'Merci.gif');
  }
}
