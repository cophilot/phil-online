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
    selector: 'app-mobile-sidebar',
    templateUrl: './mobile-sidebar.component.html',
    styleUrls: ['./mobile-sidebar.component.sass'],
})
export class MobileSidebarComponent {
    @Input() chapters: Chapter[] = [];

    @Output() languageChangeEmitter = new EventEmitter<string>();

    colorSchema: string = AppComponent.COLOR_SCHEMA;

    offsetLeft: number = 20;
    showChapters: boolean = false;
    showSidebar: boolean = true;
    isEnglish: boolean = AppComponent.IS_ENGLISH;

    constructor(private localStorageService: LocalStorageService) {}

    ngOnInit(): void {
        this.isEnglish = AppComponent.IS_ENGLISH;
        this.colorSchema = AppComponent.COLOR_SCHEMA;
        if (AppComponent.IS_MOBILE) {
            this.showSidebar = false;
        }
    }

    @HostListener('window:scroll', ['$event'])
    OnScroll(event: any) {
        this.close();
    }

    toggleLanguage(): void {
        this.isEnglish = !this.isEnglish;
        AppComponent.IS_ENGLISH = this.isEnglish;
        this.languageChangeEmitter.emit();
        this.showSidebar = false;
        this.showChapters = false;
        this.localStorageService.setLanguage(this.isEnglish ? 'en' : 'de');
    }

    goToTop(): void {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.showSidebar = false;
        this.showChapters = false;
    }

    goToChapter(id: number): void {
        for (let c of this.chapters) {
            if (c.id == id) {
                window.scrollTo({ top: c.start, behavior: 'smooth' });
            }
        }
        this.showSidebar = false;
        this.showChapters = false;
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
        this.showSidebar = false;
        this.showChapters = false;
    }

    close(): void {
        this.showSidebar = false;
        this.showChapters = false;
    }
    open(): void {
        this.showSidebar = true;
    }
    goToShell() {
        window.location.href = 'https://shell.philipp-bonin.com/';
    }
}
