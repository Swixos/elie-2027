import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvisComponent } from '../avis/avis';
@Component({
  selector: 'app-contact',
  imports: [FormsModule, AvisComponent],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {

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
}
