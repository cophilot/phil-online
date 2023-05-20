import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.sass'],
})
export class AboutMeComponent {
  @Input() start: number = 2000;
  @Input() length: number = 2000;
  @Input() fullText: string = '';

  text: string = '';
  offsetBottom: number = 0;
  cursorVisible: boolean = false;

  offsetCursorBottom: number = 300;
  offsetCursorLeft: number = 300;

  ngOnInit(): void {
    this.setText(window.scrollY);
  }

  @HostListener('window:scroll', ['$event'])
  OnScroll(event: any) {
    this.setText(window.scrollY);
  }

  setText(y: number): void {
    let offset = 500;

    if (y < this.start - 500) {
      this.text = '';
      this.offsetBottom = 0;
      this.cursorVisible = false;
    } else if (y < this.start) {
      this.text = '';
      this.offsetBottom = 0;
      this.cursorVisible = true;
    } else if (y > this.start + this.length) {
      this.cursorVisible = true;
      this.text = this.fullText.replace(/ /g, '\u00a0');
      this.offsetBottom = (y - (this.start + this.length)) * 0.5;
      this.offsetCursorBottom = 60 + (y - (this.start + this.length)) * 0.5;
      this.offsetCursorLeft =
        this.text.replace(/ /g, '').split('\n')[
          this.text.replace(/ /g, '').split('\n').length - 1
        ].length *
          12 +
        300;
    } else if (y > this.start + this.length - offset) {
      this.cursorVisible = true;
      this.text = this.fullText.replace(/ /g, '\u00a0');
      this.offsetCursorLeft =
        this.text.replace(/ /g, '').split('\n')[
          this.text.replace(/ /g, '').split('\n').length - 1
        ].length *
          12 +
        300;
    } else {
      this.cursorVisible = true;
      this.offsetBottom = 0;

      this.text = this.fullText.substring(
        0,
        Math.floor(
          ((y - this.start) / (this.length - offset)) * this.fullText.length
        )
      );
      this.text = this.text.replace(/ /g, '\u00a0');
      this.offsetCursorLeft =
        this.text.replace(/ /g, '').split('\n')[
          this.text.replace(/ /g, '').split('\n').length - 1
        ].length *
          12 +
        300;
      this.offsetCursorBottom = 290 - (this.text.split('\n').length - 1) * 45;
    }
  }
}
