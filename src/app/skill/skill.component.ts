import { Component, Input, HostListener } from '@angular/core';
import { Skill } from '../classes';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.sass'],
})
export class SkillComponent {
  @Input() start: number = 2000;
  @Input() length: number = 2000;
  @Input() skills: Skill[] = [];

  steps: number = 700;

  ngOnInit(): void {
    this.setOffset(window.scrollY);
  }

  @HostListener('window:scroll', ['$event'])
  OnScroll(event: any) {
    this.setOffset(window.scrollY);
  }

  setOffset(y: number): void {
    if (y >= this.start && y <= this.start + this.length) {
      for (let s of this.skills) {
        s.currX = s.x;
        s.currY = s.y;
      }
    } else if (y < this.start) {
      for (let s of this.skills) {
        let vecX = s.x - s.startX;
        let vecY = s.y - s.startY;
        vecX = vecX / this.steps;
        vecY = vecY / this.steps;
        s.currX = s.x - vecX * (this.start - y);
        s.currY = s.y - vecY * (this.start - y);
      }
    } else if (y > this.start + this.length) {
      for (let s of this.skills) {
        s.currY = s.y - (y - (this.start + this.length)) * 0.5;
      }
    }
  }
}
