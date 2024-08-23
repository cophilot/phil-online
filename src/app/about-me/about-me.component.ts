import { Component, HostListener, Input } from '@angular/core';
import { AppComponent } from '../app.component';

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
    lines: string[] = [];
    lastLine = '';
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
        this.setLines();
    }

    setLines(): void {
        this.lines = this.text.split('\n');
        this.lastLine = this.lines[this.lines.length - 1];
        this.lines = this.lines.slice(0, this.lines.length - 1);
    }

    setText(y: number): void {
        let offset = 500;

        let letterLength = 12;
        let letterHeight = 45;
        let offsetLeftLetters = 300;
        let offsetBottomLetters = 290;
        let offsetCursorBottomBase = 60;
        if (AppComponent.IS_MOBILE) {
            letterLength = 10;
            letterHeight = 37;
            offsetLeftLetters = 20;
            offsetBottomLetters = 340;
            offsetCursorBottomBase = 40;
        }
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
            this.offsetCursorBottom =
                offsetCursorBottomBase + (y - (this.start + this.length)) * 0.5;
            this.setCursorOffsetLeft(y, letterLength, offsetLeftLetters);
        } else if (y > this.start + this.length - offset) {
            this.cursorVisible = true;
            this.text = this.fullText.replace(/ /g, '\u00a0');
            this.setCursorOffsetLeft(y, letterLength, offsetLeftLetters);
        } else {
            this.cursorVisible = true;
            this.offsetBottom = 0;

            this.text = this.fullText.substring(
                0,
                Math.floor(
                    ((y - this.start) / (this.length - offset)) *
                        this.fullText.length
                )
            );
            this.text = this.text.replace(/ /g, '\u00a0');
            this.setCursorOffsetLeft(y, letterLength, offsetLeftLetters);

            this.offsetCursorBottom =
                offsetBottomLetters -
                (this.text.split('\n').length - 1) * letterHeight;
        }
    }

    setCursorOffsetLeft(
        y: number,
        letterLength: number,
        offsetLeftLetters: number
    ): void {
        this.offsetCursorLeft =
            this.text.replace(/ /g, '').split('\n')[
                this.text.replace(/ /g, '').split('\n').length - 1
            ].length *
                letterLength +
            offsetLeftLetters;
    }
}
