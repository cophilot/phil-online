import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.sass'],
})
export class AboutMeComponent {
  @Input() start: number = 2000;
  @Input() length: number = 2000;

  text: string = '';
  @Input() fullText: string = '';
  offsetBottom: number = 0;

  ngOnInit(): void {
    this.setText(window.scrollY);
  }

  @HostListener('window:scroll', ['$event'])
  OnScroll(event: any) {
    this.setText(window.scrollY);
  }

  setText(y: number): void {
    let offset = 500;

    if (y < this.start) {
      this.text = '';
      this.offsetBottom = 0;
    } else if (y > this.start + this.length) {
      this.text = this.fullText.replace(/ /g, '\u00a0');
      this.offsetBottom = (y - (this.start + this.length)) * 0.5;
    } else if (y > this.start + this.length - offset) {
      this.text = this.fullText.replace(/ /g, '\u00a0');
    } else {
      this.offsetBottom = 0;

      this.text = this.fullText.substring(
        0,
        Math.floor(
          ((y - this.start) / (this.length - offset)) * this.fullText.length
        )
      );
      this.text = this.text.replace(/ /g, '\u00a0');
    }
  }
}
