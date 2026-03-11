import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  download(url: string, filename?: string) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename ?? '';
    a.style.display = 'none';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

}
