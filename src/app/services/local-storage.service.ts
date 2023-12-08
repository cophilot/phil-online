import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    constructor() {}

    getLanguage(): string | null {
        return localStorage.getItem('language');
    }

    setLanguage(language: string): void {
        localStorage.setItem('language', language);
    }

    getTheme(): string | null {
        return localStorage.getItem('theme');
    }

    setTheme(theme: string): void {
        localStorage.setItem('theme', theme);
    }

    getNeedHelp(): string | null {
        return localStorage.getItem('needHelp');
    }
}
