import { Component, HostListener } from '@angular/core';
import { Chapter, TimelinePoint, Skill, Project } from './utils/classes';
import { LocalStorageService } from './services/local-storage.service';
import { ContentService } from './services/content.service';
import getSkills from 'src/data/skills';
import getChapters from 'src/data/chapters';
import getWorkingLifeTimeline from 'src/data/workingLife';
import getContacts from 'src/data/contact';
import getAboutMeText from 'src/data/about';
import getEducationTimeline from 'src/data/education';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
})
export class AppComponent {
    title = 'phil-online';

    public static COLOR_SCHEMA: string = 'dark';
    public static CHAPTER_LENGTH: number = 3000;
    public static IS_ENGLISH: boolean = false;
    public static IS_MOBILE: boolean = false;

    endChapter: Chapter = new Chapter('phil-online', 40000, 2000);
    chapters: Chapter[] = [];
    workingLifeTimeLine: TimelinePoint[] = [];
    educationTimeLine: TimelinePoint[] = [];
    skills: Skill[] = [];
    projects: Project[] = [];
    helpText: string = '';
    aboutMeText: string = '';
    showHelp: boolean = false;
    isMobile: boolean = false;
    yStartPosition: number = 0;
    constructor(private localStorageService: LocalStorageService) {
        ContentService.init();
    }

    getProjects(): any[] {
        return ContentService.getProjects();
    }

    ngOnInit(): void {
        if (this.localStorageService.getLanguage() == null) {
            AppComponent.IS_ENGLISH = detectLanguage();
            this.localStorageService.setLanguage(
                AppComponent.IS_ENGLISH ? 'en' : 'de'
            );
        } else {
            AppComponent.IS_ENGLISH =
                this.localStorageService.getLanguage() == 'en';
        }
        ContentService.getProjects();
        if (this.localStorageService.getTheme() != null) {
            const theme = this.localStorageService.getTheme();
            if (theme != null) {
                AppComponent.COLOR_SCHEMA = theme;
            } else {
                AppComponent.COLOR_SCHEMA = this.detectPrefersColorScheme();
                this.localStorageService.setTheme(AppComponent.COLOR_SCHEMA);
            }
        } else {
            AppComponent.COLOR_SCHEMA = this.detectPrefersColorScheme();
            this.localStorageService.setTheme(AppComponent.COLOR_SCHEMA);
        }
        this.setMobileVersion();

        getChapters(false).forEach((chapter) => {
            if (window.location.href.includes(chapter.name)) {
                window.scrollTo({ top: chapter.start });
                AppComponent.IS_ENGLISH = false;
            }
        });
        getChapters(true).forEach((chapter) => {
            if (window.location.href.includes(chapter.name)) {
                window.scrollTo({ top: chapter.start });
                AppComponent.IS_ENGLISH = true;
            }
        });

        if (window.location.href.includes('en')) {
            AppComponent.IS_ENGLISH = true;
        } else if (window.location.href.includes('de')) {
            AppComponent.IS_ENGLISH = false;
        }
        if (
            window.location.href.includes('light') ||
            window.location.href.includes('Light')
        ) {
            AppComponent.COLOR_SCHEMA = 'light';
        } else if (
            window.location.href.includes('dark') ||
            window.location.href.includes('Dark')
        ) {
            AppComponent.COLOR_SCHEMA = 'dark';
        }

        AppComponent.setColorScheme();
        this.setLanguage();
        this.skills = getSkills();
        this.setShadow();
        this.yStartPosition = window.scrollY;

        const needHelp = this.localStorageService.getNeedHelp();

        if (needHelp == null || needHelp == 'true') {
            setTimeout(() => {
                if (window.scrollY == this.yStartPosition) {
                    //this.showHelp = true;
                }
            }, 7000);
        }
    }

    darkMode() {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    lightMode() {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    hideHelp() {
        this.showHelp = false;
    }

    @HostListener('window:scroll', ['$event'])
    OnScroll(event: any) {
        this.showHelp = false;
    }

    static setColorScheme(): void {
        if (AppComponent.COLOR_SCHEMA == 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }

    setMobileVersion(): void {
        if (window.innerWidth < 800) {
            document.documentElement.setAttribute('data-size', 'mobile');
            AppComponent.IS_MOBILE = true;
        } else {
            document.documentElement.setAttribute('data-size', 'desktop');
            AppComponent.IS_MOBILE = false;
        }
        this.isMobile = AppComponent.IS_MOBILE;
    }

    setShadow(): void {
        document.documentElement.setAttribute('data-shadow', 'on');
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

    getChapterByName(english: string, german: string): Chapter {
        for (let c of this.chapters) {
            if (c.name == english || c.name == german) {
                return c;
            }
        }
        return new Chapter('', 0, 0);
    }

    setLanguage(): void {
        this.chapters = getChapters(AppComponent.IS_ENGLISH);
        this.workingLifeTimeLine = getWorkingLifeTimeline(
            AppComponent.IS_ENGLISH
        );
        this.educationTimeLine = getEducationTimeline(AppComponent.IS_ENGLISH);
        this.aboutMeText = getAboutMeText(AppComponent.IS_ENGLISH);
        if (AppComponent.IS_ENGLISH) {
            this.helpText = 'Scroll down to see more';
        } else {
            this.helpText = 'Scrollen Sie nach unten, um mehr zu sehen';
        }
    }
}
function detectLanguage(): boolean {
    let language = navigator.language;
    if (language == undefined) {
        return true;
    }

    if (language.startsWith('de')) {
        return false;
    }
    return true;
}
