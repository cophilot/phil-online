import { TimelinePoint } from 'src/app/utils/classes';

const getEducationTimeline = (inEnglish: boolean): TimelinePoint[] => {
    if (!inEnglish) {
        return [
            new TimelinePoint(
                'abitur',
                'note 1,7',
                'mai 19',
                'https://www.fau.eu/education/international/from-abroad/semester-abroad-at-fau/ects-and-german-university-grades/',
                true
            ),
            new TimelinePoint(
                'b.sc. informatik',
                'tu darmstadt',
                'okt 20 - mär 25',
                'https://www.tu-darmstadt.de/'
            ),
            new TimelinePoint(
                'm.sc. informatik',
                'tu darmstadt',
                'apr 25',
                'https://www.tu-darmstadt.de/'
            ),
        ];
    }
    return [
        new TimelinePoint(
            'high school graduation',
            'grade 1.7',
            'may 19',
            'https://www.fau.eu/education/international/from-abroad/semester-abroad-at-fau/ects-and-german-university-grades/',
            true
        ),
        new TimelinePoint(
            'b.sc. computer science',
            'tu darmstadt',
            'oct 20 - mar 25',
            'https://www.tu-darmstadt.de/'
        ),
        new TimelinePoint(
            'm.sc. computer science',
            'tu darmstadt',
            'apr 25',
            'https://www.tu-darmstadt.de/'
        ),
    ];
};

export default getEducationTimeline;
