import { AppComponent } from 'src/app/app.component';
import { Skill } from 'src/app/utils/classes';

const getSkills = () => {
    let y = 400;

    let skills = [
        //first row
        new Skill(
            'angular',
            'https://angular.io/',
            'https://seeklogo.com/images/A/angular-icon-logo-5FC0C40EAC-seeklogo.com.png',
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
            'c++',
            'https://en.wikipedia.org/wiki/C%2B%2B',
            'https://www.vikingsoftware.com/wp-content/uploads/2024/02/C-2.png',
            400,
            y
        ),
        new Skill(
            'sql',
            'https://en.wikipedia.org/wiki/SQL',
            'https://www.svgrepo.com/show/331760/sql-database-generic.svg',
            600,
            y
        ),
        new Skill(
            'bash',
            'https://en.wikipedia.org/wiki/Bash_(Unix_shell)',
            'https://runcode-app-public.s3.amazonaws.com/images/bash-shell-script-online-editor-compiler.original.png',
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
        new Skill(
            'rust',
            'https://www.rust-lang.org/',
            'https://rust-lang.org/logos/rust-logo-512x512.png',
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
    let sSkill = new Skill(
        '',
        'https://preview.redd.it/5sffvz3agyz71.jpg?auto=webp&s=94c56da4658c940acba9c51415bb1fb33f66fa04',
        'assets/tardes.png',
        -200,
        -200
    );

    sSkill.startX = window.innerWidth + 100;
    sSkill.startY = window.innerHeight - 200;
    skills.push(sSkill);
    return skills;
};

export default getSkills;
