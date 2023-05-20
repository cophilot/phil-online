import { Component, Input, HostListener } from '@angular/core';
import { TimelinePoint } from '../classes';
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

  offsetLeft: number = window.innerWidth + 200;

  ngOnInit(): void {
    this.setOffsetLeft(window.scrollY);
  }

  @HostListener('window:scroll', ['$event'])
  OnScroll(event: any) {
    this.setOffsetLeft(window.scrollY);
  }

  setOffsetLeft(y: number): void {
    this.offsetLeft = window.innerWidth + 200 - (y - this.start) * this.speed;
  }
}
