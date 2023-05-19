import { Component, HostListener } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.sass'],
})
export class SideBarComponent {
  colorSchema: string = AppComponent.COLOR_SCHEMA;
  offsetLeft: number = -50;
  showChapters: boolean = false;

  ngOnInit(): void {
    this.setOffsetLeft(window.scrollY);
  }

  @HostListener('window:scroll', ['$event'])
  OnScroll(event: any) {
    this.setOffsetLeft(window.scrollY);
  }

  setOffsetLeft(y: number): void {
    if (y <= 350) {
      this.offsetLeft = y * 0.2 - 50;
    } else {
      this.offsetLeft = 20;
    }
    if (y == 0) {
      this.showChapters = false;
    }
  }

  goToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleChapters(): void {
    this.showChapters = !this.showChapters;
  }

  toggleColorSchema(): void {
    if (this.colorSchema == 'dark') {
      this.colorSchema = 'light';
    } else {
      this.colorSchema = 'dark';
    }
    AppComponent.COLOR_SCHEMA = this.colorSchema;
    AppComponent.setColorScheme();
  }
}
