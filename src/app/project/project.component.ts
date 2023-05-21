import { Component, Input, HostListener } from '@angular/core';
import { Project } from '../utils/classes';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass'],
})
export class ProjectComponent {
  @Input() start: number = 2000;
  @Input() length: number = 3000;

  offsetBottom: number = -200;

  @Input() projects: Project[] = [];

  ngOnInit(): void {
    this.setOffsetBottom(window.scrollY);
  }

  @HostListener('window:scroll', ['$event'])
  OnScroll(event: any) {
    this.setOffsetBottom(window.scrollY);
  }

  setOffsetBottom(y: number): void {
    let section = Math.floor(this.length / this.projects.length / 3);
    let dif = 300;

    y = y - this.start;

    if (y < 0 || y > this.length) {
      this.offsetBottom = -200;
      if (AppComponent.IS_MOBILE) {
        this.offsetBottom = -400;
      }
      return;
    }

    let i = Math.floor(y / (section * 3));
    let project = this.projects[i];
    project.active = true;

    for (let j = 0; j < this.projects.length; j++) {
      if (j != i) {
        this.projects[j].active = false;
      }
    }

    let offset = y - i * section * 3;
    if (offset < section) {
      this.offsetBottom = 100 - (section - offset);
    } else if (offset < section * 2) {
      this.offsetBottom = 100;
    } else {
      this.offsetBottom = 100 - (offset - section * 2);
    }
  }
}
