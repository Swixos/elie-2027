import { Component } from '@angular/core';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.html',
  styleUrl: './disclaimer.scss'
})
export class Disclaimer {
  visible = true;

  close() {
    this.visible = false;
  }
}
