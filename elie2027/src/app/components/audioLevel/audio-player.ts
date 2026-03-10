import {
  Component,
  Input,
  OnDestroy,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-player.html',
  styleUrls: ['./audio-player.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioPlayerComponent implements OnDestroy {
  /** URL du fichier audio à jouer */
  @Input() set src(value: string) {
    if (this._src !== value) {
      this._src = value;
      this._hasPlayed = false;
      this._stop();
    }
  }
  get src(): string {
    return this._src;
  }

  /** Label affiché dans la barre */
  @Input() label = 'Audio';

  @ViewChild('audioRef') audioRef!: ElementRef<HTMLAudioElement>;

  isPlaying = false;
  progress = 0;
  currentTime = '0:00';
  duration = '0:00';

  private _src = '';
  private _hasPlayed = false;
  private _animFrame: number | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  // ─── API publique appelée par le composant parent ──────────────────────────

  /**
   * Joue le son UNE SEULE FOIS par "session de hover".
   * Appelez `reset()` pour autoriser une nouvelle lecture.
   */
  playOnce(): void {
    if (this._hasPlayed) return;
    this._hasPlayed = true;
    this._play();
  }

  /** Réinitialise l'état "déjà joué" (utile si vous voulez rejouer au prochain hover) */
  reset(): void {
    this._hasPlayed = false;
    this._stop();
  }

  // ─── Contrôles UI ─────────────────────────────────────────────────────────

  togglePlay(): void {
    if (!this.audioRef) return;
    const audio = this.audioRef.nativeElement;
    audio.paused ? audio.play() : audio.pause();
  }

  onTimeUpdate(): void {
    const audio = this.audioRef?.nativeElement;
    if (!audio) return;
    this.progress = audio.duration
      ? (audio.currentTime / audio.duration) * 100
      : 0;
    this.currentTime = this._formatTime(audio.currentTime);
    this.cdr.markForCheck();
  }

  onLoadedMetadata(): void {
    const audio = this.audioRef?.nativeElement;
    if (!audio) return;
    this.duration = this._formatTime(audio.duration);
    this.cdr.markForCheck();
  }

  onPlay(): void {
    this.isPlaying = true;
    this.cdr.markForCheck();
  }

  onPause(): void {
    this.isPlaying = false;
    this.cdr.markForCheck();
  }

  onEnded(): void {
    this.isPlaying = false;
    this.progress = 0;
    this.currentTime = '0:00';
    this.cdr.markForCheck();
  }

  seek(event: MouseEvent): void {
    const audio = this.audioRef?.nativeElement;
    if (!audio || !audio.duration) return;
    const bar = event.currentTarget as HTMLElement;
    const rect = bar.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
  }

  // ─── Privé ─────────────────────────────────────────────────────────────────

  private _play(): void {
    // Attendre que la vue soit initialisée
    setTimeout(() => {
      const audio = this.audioRef?.nativeElement;
      if (!audio) return;
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Autoplay policy : on ignore silencieusement
        this._hasPlayed = false;
      });
    });
  }

  private _stop(): void {
    const audio = this.audioRef?.nativeElement;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  }

  private _formatTime(seconds: number): string {
    if (isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  ngOnDestroy(): void {
    this._stop();
    if (this._animFrame !== null) cancelAnimationFrame(this._animFrame);
  }
}