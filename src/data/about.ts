import { AppComponent } from 'src/app/app.component';

const getAboutMeText = (inEnglish: boolean): string => {
    if (AppComponent.IS_MOBILE) {
        if (!inEnglish) {
            return 'new Student {\n  name: "philipp bonin",\n  alter: 24,\n  fach: "informatik",\n  job: {\n    firma: "telespazio germany",\n    position: "software developer"\n }\n}';
        }
        return 'new Student {\n  name: "philipp bonin",\n  age: 24,\n  subject: "computer science",\n  job: {\n   company: "telespazio germany",\n    position: "software developer"\n }\n}';
    }
    if (!inEnglish) {
        return 'new Student {\n  name: "philipp bonin",\n  alter: 24,\n  fach: "informatik",\n  job: { firma: "telespazio germany", position: "software developer" }\n}';
    }
    return 'new Student {\n  name: "philipp bonin",\n  age: 24,\n  subject: "computer science",\n  job: { company: "telespazio germany", position: "software developer" }\n}';
};

export default getAboutMeText;
