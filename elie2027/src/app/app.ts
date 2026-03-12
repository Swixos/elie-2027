import { Component } from '@angular/core';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { Disclaimer } from './components/disclaimer/disclaimer';
import { Footer } from './components/footer/footer';
import { Hero } from './components/hero/hero';
import { Navbar } from './components/navbar/navbar';
import { Programme } from './components/programme/programme';
import { ClickService } from './services/click-service';

@Component({
  selector: 'app-root',
  imports: [Navbar, Hero, Programme, About, Contact, Footer, Disclaimer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(private clickService: ClickService) { }
}
