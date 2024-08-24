import { Contact, Project } from 'src/app/utils/classes';

const getContacts = (): Contact[] => {
    return [
        new Contact(
            'info@philipp-bonin.com',
            'bi-envelope',
            'mailto:info@philipp-bonin.com'
        ),
        new Contact(
            'https://github.com/cophilot',
            'bi-github',
            'https://github.com/cophilot'
        ),
        new Contact(
            'https://linkedin.com/in/philippb',
            'bi-linkedin',
            'https://linkedin.com/in/philippb'
        ),
    ];
};

export default getContacts;
