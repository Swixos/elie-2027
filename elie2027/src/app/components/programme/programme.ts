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

  activeSrc = 'audio/bigNeta.mp3';
  activeLabel = 'Big Neta - Hymne officiel de la campagne';
  showBackground = false;

  onHover(): void {
    this.player?.playOnce();
    this.showBackground = true;
  }

  onMouseLeave(): void {
    this.showBackground = false;
  }
}
