import { AppComponent } from 'src/app/app.component';

const getAboutMeText = (inEnglish: boolean): string => {
    if (AppComponent.IS_MOBILE) {
        if (!inEnglish) {
            return 'new Student {\n  name: "philipp",\n  alter: 23,\n  fach: "informatik",\n  job: {\n    firma: "intersystems",\n    position: "sales engineer intern"\n }\n}';
        }
        return 'new Student {\n  name: "philipp",\n  age: 23,\n  subject: "computer science",\n  job: {\n   company: "intersystems",\n    position: "sales engineer intern"\n }\n}';
    }
    if (!inEnglish) {
        return 'new Student {\n  name: "philipp",\n  alter: 23,\n  fach: "informatik",\n  job: { firma: "intersystems", position: "sales engineer intern" }\n}';
    }
    return 'new Student {\n  name: "philipp",\n  age: 23,\n  subject: "computer science",\n  job: { company: "intersystems", position: "sales engineer intern" }\n}';
};

export default getAboutMeText;
