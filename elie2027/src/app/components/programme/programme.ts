import { Component, ViewChild } from '@angular/core';
import { AudioPlayerComponent } from '../audioLevel/audio-player';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-programme',
  imports: [AudioPlayerComponent],
  templateUrl: './programme.html',
  styleUrl: './programme.scss',
})
export class Programme {
  @ViewChild('player') player!: AudioPlayerComponent;

  activeSrc = 'audio/leSoleilRouge.mp3';
  activeLabel = 'Le Soleil Rouge - Hymne officiel de la campagne';
  showBackground = false;

  onHover(): void {
    this.player?.playOnce();
    this.showBackground = true;
  }

  playBigNeta(): void {
    this.activeSrc = 'audio/bigNeta.mp3';
    this.activeLabel = 'Big Neta - Hymne de l\'alliance avec Israël';
    this.player?.playOnce();
  }

  onMouseLeave(): void {
    this.showBackground = false;
  }
}
