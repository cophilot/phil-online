import { AppComponent } from 'src/app/app.component';

const getAboutMeText = (inEnglish: boolean): string => {
    if (AppComponent.IS_MOBILE) {
        if (!inEnglish) {
            return 'new Student {\n  name: "philipp",\n  alter: 24,\n  fach: "informatik",\n  job: {\n    firma: "cqse",\n    position: "software developer"\n }\n}';
        }
        return 'new Student {\n  name: "philipp",\n  age: 24,\n  subject: "computer science",\n  job: {\n   company: "cqse",\n    position: "software developer"\n }\n}';
    }
    if (!inEnglish) {
        return 'new Student {\n  name: "philipp",\n  alter: 24,\n  fach: "informatik",\n  job: { firma: "cqse", position: "software developer" }\n}';
    }
    return 'new Student {\n  name: "philipp",\n  age: 24,\n  subject: "computer science",\n  job: { company: "cqse", position: "software developer" }\n}';
};

export default getAboutMeText;
