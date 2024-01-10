import { Project } from 'src/app/utils/classes';

const getContacts = (isEnglish: boolean): Project[] => {
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
            'mailto:phil.likes.coding@gmail.com',
            'assets/mail_icon.png',
            'phil.likes.coding@gmail.com',
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
