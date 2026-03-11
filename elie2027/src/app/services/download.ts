import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  private downloading = false;

  download(url: string, filename: string) {
    if (this.downloading) return;
    this.downloading = true;

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    this.downloading = false;
  }

}
