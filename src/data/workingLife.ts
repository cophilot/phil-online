import { TimelinePoint } from 'src/app/utils/classes';

function getWorkingLifeTimeline(inEnglish: boolean): TimelinePoint[] {
    if (!inEnglish) {
        return [
            new TimelinePoint(
                'verkäufer',
                'bauer frey',
                'mär 19 - jun 19',
                '',
                true
            ),
            new TimelinePoint(
                'kinderbetreuung',
                'stadt weiterstadt',
                'jun 19 - jul 19',
                'https://www.weiterstadt.de/'
            ),
            new TimelinePoint(
                'küchenhilfe',
                'bayrischer biergarten',
                'apr 19 - aug 19',
                'https://www.bayerischer-biergarten.de/'
            ),
            new TimelinePoint(
                'farm arbeit',
                'australien',
                'aug 19 - aug 20',
                'https://as2.ftcdn.net/v2/jpg/01/38/35/33/1000_F_138353307_iIrtMa8uMNNSxlE4snmCSSJCMkfAfEcD.jpg'
            ),
            new TimelinePoint(
                'kassierer',
                'edeka',
                'sep 20 - mär 22',
                'https://www.edeka.de/'
            ),
            new TimelinePoint(
                'mentor',
                'tu darmstadt',
                'okt 21 - mär 22',
                'https://www.tu-darmstadt.de/'
            ),
            new TimelinePoint(
                'sales engineer',
                'intersystems',
                'apr 22 - feb 24',
                'https://www.intersystems.com/'
            ),
            new TimelinePoint(
                'software developer',
                'cqse',
                'feb 24 - aktuell',
                'https://teamscale.com/about-us'
            ),
        ];
    }
    return [
        new TimelinePoint('cashier', 'bauer frey', 'mar 19 - jun 19', '', true),
        new TimelinePoint(
            'childcare',
            'stadt weiterstadt',
            'jun 19 - jul 19',
            'https://www.weiterstadt.de/'
        ),
        new TimelinePoint(
            'kitchen assistant',
            'bayrischer biergarten',
            'apr 19 - aug 19',
            'https://www.bayerischer-biergarten.de/'
        ),
        new TimelinePoint(
            'farm work',
            'australia',
            'aug 19 - aug 20',
            'https://as2.ftcdn.net/v2/jpg/01/38/35/33/1000_F_138353307_iIrtMa8uMNNSxlE4snmCSSJCMkfAfEcD.jpg'
        ),
        new TimelinePoint(
            'cashier',
            'edeka',
            'sep 20 - mar 22',
            'https://www.edeka.de/'
        ),
        new TimelinePoint(
            'mentor',
            'tu darmstadt',
            'oct 21 - mar 22',
            'https://www.tu-darmstadt.de/'
        ),
        new TimelinePoint(
            'sales engineer',
            'intersystems',
            'apr 22 - feb 24',
            'https://www.intersystems.com/'
        ),
        new TimelinePoint(
            'software developer',
            'cqse',
            'feb 24 - current',
            'https://teamscale.com/about-us'
        ),
    ];
}

export default getWorkingLifeTimeline;
