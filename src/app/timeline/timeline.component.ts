import { Component, Input, HostListener } from '@angular/core';
import { TimelinePoint } from '../utils/classes';
import { AppComponent } from '../app.component';
@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.sass'],
})
export class TimelineComponent {
    distanceBetweenPoints: number = 600;

    @Input() points: TimelinePoint[] = [];

    @Input() start: number = 2000;
    @Input() speed: number = 1;
    @Input() backwards: boolean = false;

    offsetLeft: number = window.innerWidth + 200;

    ngOnInit(): void {
        if (AppComponent.IS_MOBILE) {
            this.distanceBetweenPoints = 400;
        }
        this.setOffsetLeft(window.scrollY);
    }

    @HostListener('window:scroll', ['$event'])
    OnScroll(event: any) {
        this.setOffsetLeft(window.scrollY);
    }

    setOffsetLeft(y: number): void {
        if (this.backwards) {
            this.offsetLeft =
                -200 -
                this.distanceBetweenPoints * (this.points.length - 1) +
                (y - this.start) * this.speed;
        } else {
            this.offsetLeft =
                window.innerWidth + 200 - (y - this.start) * this.speed;
        }

        for (let i = 0; i < this.points.length; i++) {
            if (i * this.distanceBetweenPoints + this.offsetLeft < 600) {
                this.points[i].active = true;
            } else {
                this.points[i].active = false;
            }
        }
    }
}
