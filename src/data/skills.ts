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
            'javascript',
            'https://www.javascript.com/',
            'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
            400,
            y
        ),
        new Skill(
            'vue.js',
            'https://vuejs.org/',
            'https://camo.githubusercontent.com/0b17e5a01574a2c1251b51c910c422f6ca6cb968a52686a770b668a634792c09/68747470733a2f2f7675656a732e6f72672f696d616765732f6c6f676f2e706e67',
            600,
            y
        ),
        new Skill(
            'node-red',
            'https://vitejs.dev/',
            'https://camo.githubusercontent.com/2e1efd50b61f26c56e82929d735dce115937350e280abac98641c79d765da27c/68747470733a2f2f766974656a732e6465762f6c6f676f2e737667',
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

    return skills;
};

export default getSkills;
