import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'phil-online';

  public static COLOR_SCHEMA: string = 'dark';

  constructor() {
    AppComponent.COLOR_SCHEMA = this.detectPrefersColorScheme();
    AppComponent.setColorScheme();
  }

  darkMode() {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  lightMode() {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  @HostListener('window:scroll', ['$event'])
  OnScroll(event: any) {}

  public static setColorScheme(): void {
    if (AppComponent.COLOR_SCHEMA == 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  detectPrefersColorScheme(): string {
    // Detect if prefers-color-scheme is supported
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      // Set colorScheme to Dark if prefers-color-scheme is dark. Otherwise, set it to Light.
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    } else {
      // If the browser does not support prefers-color-scheme, set the default to dark.
      return 'dark';
    }
  }
}
