import { AppComponent } from 'src/app/app.component';
import { Chapter } from 'src/app/utils/classes';

const getChapters = (inEnglish: boolean): Chapter[] => {
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
};

export default getChapters;
