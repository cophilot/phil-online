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
};

export default getContacts;
