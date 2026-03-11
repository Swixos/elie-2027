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
    { src: 'president3.png', alt: 'Elie - Président pour tous' },
    { src: 'president4.jpg', alt: 'Elie - Un avenir meilleur pour la France' },
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
    this.resetTimer();
  }

  prev() {
    this.currentSlide.update(i => (i - 1 + this.slides.length) % this.slides.length);
    this.resetTimer();
  }

  goTo(index: number) {
    this.currentSlide.set(index);
    this.resetTimer();
  }

  getSlidePosition(index: number): string {
    const current = this.currentSlide();
    const total = this.slides.length;
    const diff = ((index - current) % total + total) % total;
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === total - 1) return 'left';
    return 'hidden';
  }

  private resetTimer() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => this.next(), 4000);
  }
}
