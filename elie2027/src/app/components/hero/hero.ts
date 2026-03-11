import { Component, signal, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements OnInit, OnDestroy {
  currentSlide = signal(0);
  slides = [
    { src: 'affiche.png', alt: 'Elie for Président - Affiche officielle 2027' },
    { src: 'president1.jpg', alt: 'Elie - Candidat à la Présidentielle 2027' },
    { src: 'president2.png', alt: 'Elie - Président pour la France' },
  ];
  private intervalId: ReturnType<typeof setInterval> | null = null;

  ngOnInit() {
    this.intervalId = setInterval(() => this.next(), 4000);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  next() {
    this.currentSlide.update(i => (i + 1) % this.slides.length);
  }

  prev() {
    this.currentSlide.update(i => (i - 1 + this.slides.length) % this.slides.length);
  }

  goTo(index: number) {
    this.currentSlide.set(index);
    this.resetTimer();
  }

  private resetTimer() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => this.next(), 4000);
  }
}
