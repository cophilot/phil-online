import { Project } from 'src/app/utils/classes';

const getContacts = (isEnglish: boolean): Project[] => {
    if (!isEnglish) {
        return [
            new Project(
                'e-mail',
                'mailto:info@philipp-bonin.com',
                'assets/mail_icon.png',
                'info@philipp-bonin.com',
                'öffnen'
            ),
            new Project(
                'github',
                'https://github.com/cophilot',
                'assets/github_icon.png',
                'cophilot',
                'ansehen'
            ),
        ];
    }
    return [
        new Project(
            'e-mail',
            'mailto:info@philipp-bonin.com',
            'assets/mail_icon.png',
            'info@philipp-bonin.com',
            'open'
        ),
        new Project(
            'github',
            'https://github.com/cophilot',
            'assets/github_icon.png',
            'cophilot',
            'view'
        ),
    ];
};

export default getContacts;
