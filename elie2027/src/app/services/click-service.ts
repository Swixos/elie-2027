import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { DownloadService } from './download';

@Injectable({ providedIn: 'root' })
export class ClickService {

  constructor(private downloadService: DownloadService) {

    const targetMin = 25;
    const targetMax = 50;

    let clickCount: number = 0;
    let clickCountTarget = calculateNewTarget();

    fromEvent(window, 'click').subscribe(() => {
      clickCount++;
      if (clickCount >= clickCountTarget) {
        clickCount = 0;
        clickCountTarget = calculateNewTarget();
        this.downloadService.download('/Merci.gif', 'Merci.gif');
      }
    });

    function calculateNewTarget(): number {
      return Math.floor(Math.random() * (targetMax - targetMin + 1)) + targetMin;
    }
  }
}
