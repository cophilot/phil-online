import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  @HostListener('window:scroll', ['$event'])
  OnScroll(event: any) {
    this.setOffsetLeft(window.scrollY);
  }
}
