import {
  Component,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { AppComponent } from '../app.component';
import { Chapter } from '../utils/classes';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.sass'],
})
export class SideBarComponent {
  @Input() chapters: Chapter[] = [];

  @Output() languageChangeEmitter = new EventEmitter<string>();

  colorSchema: string = AppComponent.COLOR_SCHEMA;

  offsetLeft: number = -50;
  showChapters: boolean = false;
  showSidebar: boolean = true;
  isEnglish: boolean = AppComponent.IS_ENGLISH;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.setOffsetLeft(window.scrollY);
    this.isEnglish = AppComponent.IS_ENGLISH;
    this.colorSchema = AppComponent.COLOR_SCHEMA;
    if (AppComponent.IS_MOBILE) {
      this.showSidebar = false;
    }
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
      this.showSidebar = true;
      if (AppComponent.IS_MOBILE) {
        this.showSidebar = false;
      }
    }
  }

  toggleLanguage(): void {
    this.isEnglish = !this.isEnglish;
    AppComponent.IS_ENGLISH = this.isEnglish;
    this.localStorageService.setLanguage(this.isEnglish ? 'en' : 'de');
    this.languageChangeEmitter.emit();
  }

  goToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  goToShell() {
    window.location.href = 'https://shell.philipp-bonin.com/';
  }

  goToChapter(id: number): void {
    for (let c of this.chapters) {
      if (c.id == id) {
        window.scrollTo({ top: c.start, behavior: 'smooth' });
      }
    }
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
    this.localStorageService.setTheme(this.colorSchema);
    AppComponent.setColorScheme();
  }

  close(): void {
    this.showSidebar = false;
    this.showChapters = false;
  }
  open(): void {
    this.showSidebar = true;
  }
}
