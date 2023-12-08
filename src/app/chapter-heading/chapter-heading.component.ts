import { Component, HostListener, Input } from '@angular/core';
import { Chapter } from '../utils/classes';
import { AppComponent } from '../app.component';

@Component({
    selector: 'app-chapter-heading',
    templateUrl: './chapter-heading.component.html',
    styleUrls: ['./chapter-heading.component.sass'],
})
export class ChapterHeadingComponent {
    @Input() chapter: Chapter = new Chapter('', 0, 0);

    offsetTop: number = window.innerHeight;
    start: number = this.chapter.start;
    length: number = this.chapter.length;

    ngOnInit(): void {
        this.start = this.chapter.start;
        this.length = this.chapter.length;
        this.setOffsetTop(window.scrollY);
    }

    @HostListener('window:scroll', ['$event'])
    OnScroll(event: any) {
        this.setOffsetTop(window.scrollY);
    }

    setOffsetTop(y: number): void {
        let offsetTopBase = 60;
        if (AppComponent.IS_MOBILE) {
            offsetTopBase = 20;
        }

        if (y > this.start && y < this.start + this.length) {
            this.offsetTop = offsetTopBase;
            this.chapter.active = true;
        } else if (y <= this.start) {
            let dif = (this.start - y) * 0.5;
            this.offsetTop = dif + offsetTopBase;
            this.chapter.active = false;
        } else if (y >= this.start + this.length) {
            let dif = (this.start + this.length - y) * 0.5;
            this.offsetTop = dif + offsetTopBase;
            this.chapter.active = false;
        }
    }
}
