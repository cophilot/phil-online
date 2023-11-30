import { Component, HostListener } from '@angular/core';
import { Chapter, TimelinePoint, Skill, Project } from './utils/classes';
import { LocalStorageService } from './services/local-storage.service';
import { ContentService } from './services/content.service';

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
    contacts: Project[] = [];
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
                    this.showHelp = true;
                }
            }, 20000);
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

    public static setColorScheme(): void {
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
        this.contacts = getContacts(AppComponent.IS_ENGLISH);
        this.aboutMeText = getAboutMeText(AppComponent.IS_ENGLISH);
        if (AppComponent.IS_ENGLISH) {
            this.helpText = 'Scroll down to see more';
        } else {
            this.helpText = 'Scrollen Sie nach unten, um mehr zu sehen';
        }
    }
}

function getChapters(inEnglish: boolean): Chapter[] {
    let start = 2000;
    if (!inEnglish) {
        return [
            new Chapter(
                'über-mich',
                start + (AppComponent.CHAPTER_LENGTH + 2000) * 0,
                AppComponent.CHAPTER_LENGTH,
                true
            ),
            new Chapter(
                'ausbildung',
                start + (AppComponent.CHAPTER_LENGTH + 2000) * 1,
                AppComponent.CHAPTER_LENGTH
            ),
            new Chapter(
                'arbeit',
                start + (AppComponent.CHAPTER_LENGTH + 2000) * 2,
                AppComponent.CHAPTER_LENGTH
            ),
            new Chapter(
                'kontakt',
                start + (AppComponent.CHAPTER_LENGTH + 2000) * 3,
                AppComponent.CHAPTER_LENGTH
            ),
            new Chapter(
                'projekte',
                start + (AppComponent.CHAPTER_LENGTH + 2000) * 4,
                AppComponent.CHAPTER_LENGTH + 5000
            ),
            new Chapter(
                'fähigkeiten',
                start + (AppComponent.CHAPTER_LENGTH + 2000) * 5 + 5000,
                AppComponent.CHAPTER_LENGTH
            ),
        ];
    }
    return [
        new Chapter(
            'about',
            start + (AppComponent.CHAPTER_LENGTH + 2000) * 0,
            AppComponent.CHAPTER_LENGTH,
            true
        ),
        new Chapter(
            'education',
            start + (AppComponent.CHAPTER_LENGTH + 2000) * 1,
            AppComponent.CHAPTER_LENGTH
        ),
        new Chapter(
            'work',
            start + (AppComponent.CHAPTER_LENGTH + 2000) * 2,
            AppComponent.CHAPTER_LENGTH
        ),
        new Chapter(
            'contact',
            start + (AppComponent.CHAPTER_LENGTH + 2000) * 3,
            AppComponent.CHAPTER_LENGTH
        ),
        new Chapter(
            'projects',
            start + (AppComponent.CHAPTER_LENGTH + 2000) * 4,
            AppComponent.CHAPTER_LENGTH + 5000
        ),
        new Chapter(
            'skills',
            start + (AppComponent.CHAPTER_LENGTH + 2000) * 5 + 5000,
            AppComponent.CHAPTER_LENGTH
        ),
    ];
}

function getWorkingLifeTimeline(inEnglish: boolean): TimelinePoint[] {
    if (!inEnglish) {
        return [
            new TimelinePoint(
                'verkäufer',
                'bauer frey',
                'mär 19 - jun 19',
                '',
                true
            ),
            new TimelinePoint(
                'kinderbetreuung',
                'stadt weiterstadt',
                'jun 19 - jul 19',
                'https://www.weiterstadt.de/'
            ),
            new TimelinePoint(
                'küchenhilfe',
                'bayrischer biergarten',
                'apr 19 - aug 19',
                'https://www.bayerischer-biergarten.de/'
            ),
            new TimelinePoint(
                'farm arbeit',
                'australien',
                'aug 19 - aug 20',
                'https://as2.ftcdn.net/v2/jpg/01/38/35/33/1000_F_138353307_iIrtMa8uMNNSxlE4snmCSSJCMkfAfEcD.jpg'
            ),
            new TimelinePoint(
                'kassierer',
                'edeka',
                'sep 20 - mär 22',
                'https://www.edeka.de/'
            ),
            new TimelinePoint(
                'mentor',
                'tu darmstadt',
                'okt 21 - mär 22',
                'https://www.tu-darmstadt.de/'
            ),
            new TimelinePoint(
                'intern sales engineer',
                'intersystems',
                'apr 22 - aktuell',
                'https://www.intersystems.com/'
            ),
        ];
    }
    return [
        new TimelinePoint('cashier', 'bauer frey', 'mar 19 - jun 19', '', true),
        new TimelinePoint(
            'childcare',
            'stadt weiterstadt',
            'jun 19 - jul 19',
            'https://www.weiterstadt.de/'
        ),
        new TimelinePoint(
            'kitchen assistant',
            'bayrischer biergarten',
            'apr 19 - aug 19',
            'https://www.bayerischer-biergarten.de/'
        ),
        new TimelinePoint(
            'farm work',
            'australia',
            'aug 19 - aug 20',
            'https://as2.ftcdn.net/v2/jpg/01/38/35/33/1000_F_138353307_iIrtMa8uMNNSxlE4snmCSSJCMkfAfEcD.jpg'
        ),
        new TimelinePoint(
            'cashier',
            'edeka',
            'sep 20 - mar 22',
            'https://www.edeka.de/'
        ),
        new TimelinePoint(
            'mentor',
            'tu darmstadt',
            'oct 21 - mar 22',
            'https://www.tu-darmstadt.de/'
        ),
        new TimelinePoint(
            'intern sales engineer',
            'intersystems',
            'apr 22 - current',
            'https://www.intersystems.com/'
        ),
    ];
}

function getContacts(isEnglish: boolean): Project[] {
    if (!isEnglish) {
        return [
            new Project(
                'e-mail',
                'mailto:phil.likes.coding@gmail.com',
                'assets/mail_icon.png',
                'phil.likes.coding@gmail.com',
                'öffnen'
            ),
            new Project(
                'github',
                'https://github.com/phil1436',
                'assets/github_icon.png',
                'phil1436',
                'ansehen'
            ),
        ];
    }
    return [
        new Project(
            'e-mail',
            'mailto:phil.likes.coding@gmail.com',
            'assets/mail_icon.png',
            'phil.likes.coding@gmail.com',
            'open'
        ),
        new Project(
            'github',
            'https://github.com/phil1436',
            'assets/github_icon.png',
            'phil1436',
            'view'
        ),
    ];
}

function getAboutMeText(inEnglish: boolean): string {
    if (AppComponent.IS_MOBILE) {
        if (!inEnglish) {
            return 'new Student {\n  name: "philipp",\n  alter: 23,\n  fach: "informatik",\n  job: {\n    firma: "intersystems",\n    position: "intern sales engineer"\n }\n}';
        }
        return 'new Student {\n  name: "philipp",\n  age: 23,\n  subject: "computer science",\n  job: {\n   company: "intersystems",\n    position: "intern sales engineer"\n }\n}';
    }
    if (!inEnglish) {
        return 'new Student {\n  name: "philipp",\n  alter: 23,\n  fach: "informatik",\n  job: { firma: "intersystems", position: "intern sales engineer" }\n}';
    }
    return 'new Student {\n  name: "philipp",\n  age: 23,\n  subject: "computer science",\n  job: { company: "intersystems", position: "intern sales engineer" }\n}';
}

function getEducationTimeline(inEnglish: boolean): TimelinePoint[] {
    if (!inEnglish) {
        return [
            new TimelinePoint(
                'abitur',
                'note 1,7',
                'mai 19',
                'https://www.fau.eu/education/international/from-abroad/semester-abroad-at-fau/ects-and-german-university-grades/',
                true
            ),
            new TimelinePoint(
                'b.sc. informatik',
                'tu darmstadt',
                'okt 20 - aktuell',
                'https://www.tu-darmstadt.de/'
            ),
        ];
    }
    return [
        new TimelinePoint(
            'high school graduation',
            'grade 1.7',
            'may 19',
            'https://www.fau.eu/education/international/from-abroad/semester-abroad-at-fau/ects-and-german-university-grades/',
            true
        ),
        new TimelinePoint(
            'b.sc. computer science',
            'tu darmstadt',
            'oct 20 - current',
            'https://www.tu-darmstadt.de/'
        ),
    ];
}

function getSkills() {
    let y = 400;

    let skills = [
        //first row
        new Skill(
            'angular',
            'https://angular.io/',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png',
            400,
            y
        ),
        new Skill(
            'typescript',
            'https://www.typescriptlang.org/',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Typescript.svg/480px-Typescript.svg.png',
            520,
            y
        ),
        new Skill(
            'javascript',
            'https://www.javascript.com/',
            'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
            400,
            y
        ),
        new Skill(
            'iris',
            'https://www.intersystems.com/data-platform/',
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8uMZEltKkRFonb2+sJsKW54+ATsab2/PyW1tDR7etKvbNXwLZBu7HX7uuAzsij29YaHou+v9vf4O1ixbzJ6ea449/s+PdyycIwt63h8/GZ19Gt3tro9vVnxr3U7eqK0svh+9smAAAEA0lEQVR4nO3ccVPiMBAF8BpYokIVaNH2ROX7f8q782AGkrRsq1z3Zd77Ezud/KZQu8mmxV3uKaYewM1DIX4oxA+F+KEQPxTih0L8UIgfCvFDIX7Sws0MMRu9cLOt5niptkliUjirCsRUM71wPvVgR2VOIYXmQyGF9kMhhfZDIYX2QyGF9kMhhfZDIYX2QyGF9kMhhfZDIYX2QyGF9kMhhfZDIYX2QyGF9kMhhfbz48J62Zvy6fzg3XKlSd0c9rt3K8LSu77IhfBFeg8+xXsvIr7Zv1oQLvsHeylc6IQnqMhqkbXwC+mGGsGEf8+w/JW58M851rkLnTS5C53UuQudfOQudPKWuzA4UY5C12YvlH3uQucmEpbyL+Fw/PHzzx8Tyss0wt3iKy8hsDn+4aI8iIQ+naTQr6YRHnMfjMon7+6h0H88J9LUpaSQoiqm/pvwQSPs/Bfwum7jL7Tua2pM+Nh9xof4p616PMURFvuIWGYmLJ7DH6PkJgzP6URTCyMJo4t45XBAYXS4Zs4GSvgrPFzzaAolfA0P10zYYAuzu4b5f0vDRQDZ5SZswv8Wn72H4wnfw8c2VXGBJFyFzzReMxIgYROVy6oSGEb4FC9Mpqtq48KOCvh9XydmdFQ3GmPCjnhJzmLoJtsghB3uQ+5C0fUu4Aq9cvkJV6i8hLhCOShHgir0qnk2aKG6eQhUqJplQxaqF4BBhb4d0sUHKJTnAeMAFEqpmbqAFXpZDm5ORBJK+zCsac+i8LTanyyXxvTPWhP6/eMph4iobS8xLTyv2tvoGvr7DIRn8zS7kavaOMKijr+nAx5lEITRBLBzy7yEReJmo2uDghEW0TXU9SYACeMNJ8r5NRhhsYy/p4OfamwLn+KLqGvXgxHGTUK6/gsg4X3i0TwvYaKZTZJnwhUWZXQNtVPBKMLH+Gaj300CIYzaE5QtGEDCsE3I6bdagAiLdXyzGbI9D0CYqIVlQC18s93qo3r108Lv1cI/Ltyvv/IWjqk+ft6736KjFyNRC6uaFG4jLCW9CeS4N6R/z0yHMFELqxfXjO176uqn+c7EG4Yw/FW7ARNvIMJELaxdnwERfqMWRhGG7cH6WhhFOL4WhhFGG2bcVH1ttxImauH0kyCucGwtDCRM1MKal0cACYuPUbUwkjBRCytuNrbeE3Vlv8VbXAtfb/W+2bu+2iBl6l1fi7a8SHulKCqjtFcX9/m+Ngrth0IK7YdCCu2HQgrth0IK7YdCCu2HQgrth0IK7YdCCu2HQgrth0IK7YdCCu2HQgrth0IK7YdCCu2HwnNhNfVgR6XSCzfbao6XartRC+82M8QkgR3CnEIhfijED4X4oRA/FOKHQvxQiB8K8UMhfvIX/gawFaifBbAPIwAAAABJRU5ErkJggg==',
            600,
            y
        ),
        new Skill(
            'node-red',
            'https://nodered.org/',
            'https://upload.wikimedia.org/wikipedia/commons/2/2b/Node-red-icon.png',
            520,
            y
        ),

        new Skill(
            'python',
            'https://www.python.org',
            'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
            600,
            y
        ),
        //second row
        new Skill(
            'docker',
            'https://www.docker.com/',
            'https://cdn.icon-icons.com/icons2/2415/PNG/512/docker_plain_wordmark_logo_icon_146555.png',
            600,
            y + 120
        ),
        new Skill(
            'java',
            'https://www.java.com',
            'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg',
            600,
            y + 120
        ),
        new Skill(
            'go',
            'https://go.dev/',
            'https://go.dev/blog/go-brand/Go-Logo/PNG/Go-Logo_Blue.png',
            600,
            y + 120
        ),
        new Skill(
            'react',
            'https://react.dev/',
            'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png',
            600,
            y + 120
        ),
        /*  new Skill(
            'html',
            'https://www.w3.org/html/',
            'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg',
            600,
            y + 120
        ), */
        new Skill(
            'c++',
            'https://www.w3schools.com/cpp/',
            'https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg',
            600,
            y + 120
        ),
        new Skill(
            'git',
            'https://git-scm.com/',
            'https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg',
            600,
            y + 120
        ),
    ];

    let size = skills.length;
    let x = window.innerWidth / 2;
    let start =
        x -
        (size * (AppComponent.IS_MOBILE ? 80 : 120)) /
            (AppComponent.IS_MOBILE ? 6 : 4);

    if (AppComponent.IS_MOBILE) {
        y = 300;
        for (let i = 0; i < skills.length / 3; i++) {
            let j = skills.length - (i + 1);
            let k = skills.length / 3 + i;
            skills[i].x = start + i * 80;
            skills[j].x = start + i * 80;
            skills[k].x = start + i * 80;
            skills[i].y = y;
            skills[j].y = y + 80;
            skills[k].y = y + 160;
        }
    } else {
        for (let i = 0; i < skills.length / 2; i++) {
            let j = skills.length - (i + 1);
            skills[i].x = start + i * 120;
            skills[j].x = start + i * 120;
            skills[i].y = y;
            skills[j].y = y + 120;
        }
    }

    return skills;
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
