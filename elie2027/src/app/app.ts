import { Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { Programme } from './components/programme/programme';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Navbar, Hero, Programme, About, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
