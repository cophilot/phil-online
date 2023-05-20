import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.sass'],
})
export class BackgroundComponent {
  offsetSide: number = window.innerWidth / 2 - 160;

  ngOnInit(): void {
    this.setOffsetSide(window.scrollY);
  }

  @HostListener('window:scroll', ['$event'])
  OnScroll(event: any) {
    this.setOffsetSide(window.scrollY);
  }

  setOffsetSide(y: number): void {
    let end = 40000;
    if (y == 0) {
      this.offsetSide = window.innerWidth / 2 - 160;
    } else if (y < 1000) {
      this.offsetSide =
        70 + ((window.innerWidth / 2 - 230) / 1000) * (1000 - y);
    } else if (y >= end) {
      this.offsetSide = window.innerWidth / 2 - 160;
    } else if (y > end - 1000) {
      this.offsetSide =
        70 + ((window.innerWidth / 2 - 230) / 1000) * (y - (end - 1000));
    } else {
      this.offsetSide = 70;
    }
  }
}
