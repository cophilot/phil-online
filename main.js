// switch to mobile version if mobile device
if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    )
) {
    window.location.href = 'mobile/index.html';
}

const right = document.getElementById('right');
const left = document.getElementById('left');
const windowwidthCenter = window.innerWidth / 2;
const windowHeight = window.innerHeight;

const sidebar = [
    {
        id: 'darkModeButtom',
        darkImg: 'imgs/darkmode.png',
        lightImg: 'imgs/lightmode.png',
    },
    {
        id: 'scrollToTop',
        darkImg: 'imgs/topDark.png',
        lightImg: 'imgs/topLight.png',
    },
    {
        id: 'selectChapter',
        darkImg: 'imgs/chaptersDark.png',
        lightImg: 'imgs/chaptersLight.png',
    },
    {
        id: 'languageButton',
    },
];

const chapters = [
    {
        id: 'about',
        from: 2000,
        to: 3000,
    },
    {
        id: 'contact',
        from: 4000,
        to: 5000,
    },
    {
        id: 'repos',
        from: 6000,
        to: 17000,
    },
];

const repos = [
    {
        id: 'ownobjectscriptextension',
        from: 6000,
        to: 8000,
    },
    {
        id: 'owngitextension',
        from: 8000,
        to: 10000,
    },
    {
        id: 'ownvscodeextension',
        from: 10000,
        to: 12000,
    },
    {
        id: 'mtconnect-objectscript',
        from: 12000,
        to: 14000,
    },
    {
        id: 'node-red-contrib-iris',
        from: 14000,
        to: 16000,
    },
];

const languageContent = [
    {
        id: 'chaptersOverviewAbout',
        en: 'about',
        de: 'über mich',
    },
    {
        id: 'chaptersOverviewContact',
        en: 'contact',
        de: 'kontakt',
    },
    {
        id: 'chaptersOverviewRepos',
        en: 'repos',
        de: 'repos',
    },
    {
        id: 'aboutParagraph',
        en: 'intern sales engineer at <a href="https://www.intersystems.com/">intersystems',
        de: 'sales engineer werkstudent bei <a href="https://www.intersystems.com/">intersystems',
    },
    {
        id: 'aboutHeading',
        en: 'about',
        de: 'über mich',
    },
    {
        id: 'contactHeading',
        en: 'contact',
        de: 'kontakt',
    },
    {
        id: 'botButton',
        en: 'Change Mode',
        de: 'Modus ändern',
    },
];

//set mode
let isDarkmode = true;
let isEnglish = true;

let language = window.navigator.userLanguage || window.navigator.language;
if (language == undefined) {
    language = 'en';
}

if (language.startsWith('de')) {
    isEnglish = false;
    setLanguage('de');
} else {
    isEnglish = true;
    setLanguage('en');
}

darkmode();
if (window.matchMedia) {
    if (!window.matchMedia('(prefers-color-scheme: dark)').matches) {
        isDarkmode = false;
        lightmode();
    }
}

let isChapterSelectVisible = false;

if (window.scrollY == 0) {
    right.style.display = 'none';
    left.style.display = 'none';
    setTimeout(centerLogo, 1);
}

function centerLogo() {
    right.style.left = window.innerWidth / 2 - 150 + 'px';
    left.style.left = window.innerWidth / 2 - 150 + 'px';
    right.style.display = 'block';
    left.style.display = 'block';
}

window.addEventListener('scroll', function () {
    let value = window.scrollY;

    showSideBar(value);

    chapters.forEach((chapter) => {
        showChapter(chapter.id, chapter.from, chapter.to, value);
    });
    repos.forEach((repo) => {
        showRepo(value, repo.id, repo.from, repo.to);
    });

    //game
    if (value > 22000) {
        stopGame();
    } else if (value > 21000) {
        initGame();
    } else {
        stopGame();
    }

    //close logo
    if (value > 23000) {
        if ((value - 23000) * 0.5 > window.innerWidth / 2 - 150) {
            right.style.left = window.innerWidth / 2 - 150 + 'px';
            left.style.left = window.innerWidth / 2 - 150 + 'px';
            return;
        }

        left.style.left = (value - 23000) * 0.5 + 'px';

        right.style.left =
            window.innerWidth - 300 - (value - 23000) * 0.5 + 'px';
        return;
    }

    //open logo
    if (windowwidthCenter - value * 0.5 - 150 > 0) {
        right.style.left = window.innerWidth / 2 + value * 0.5 - 150 + 'px';
        left.style.left = window.innerWidth / 2 - value * 0.5 - 150 + 'px';
    } else {
        right.style.left = window.innerWidth - 300 + 'px';
        left.style.left = 0 + 'px';
    }
});

/**
 *  Shows a repo if the scroll value is in the range of the repo
 * @param {int} value The current scroll value
 * @param {string} id The id of the repo
 * @param {int} from The start of the repo
 * @param {int} to The end of the repo
 * @returns {void}
 */
function showRepo(value, id, from, to) {
    let repo = document.getElementById(id);

    if (value > to) {
        repo.style.left = '-3000px';
        return;
    }
    if (value < from) {
        repo.style.left = '-3000px';
        return;
    }

    if (value < from + 100) repo.style.left = value - from + 'px';
    if (value > from + 800) repo.style.left = value - (from + 700) + 'px';
}

/**
 * Shows a chapter if the scroll value is in the range of the chapter
 * @param {string} name The name of the chapter
 * @param {int} from The start of the chapter
 * @param {int} to The end of the chapter
 * @param {int} value The current scroll value
 */
function showChapter(name, from, to, value) {
    let element = document.getElementById(name);

    let top = 100;

    if (value > from && value < to) {
        element.style.top = top + 'px';
    } else if (value >= to) {
        element.style.top = top - (value - to) + 'px';
    } else if (value <= from) {
        element.style.top = top + (from - value) + 'px';
    }
}

/**
 * @description toggle the darkmode
 * @returns {void}
 */
function toggleMode() {
    if (isDarkmode) {
        isDarkmode = false;
        lightmode();
    } else {
        isDarkmode = true;
        darkmode();
    }
}

/**
 * @description set the darkmode
 * @returns {void}
 */
function darkmode() {
    mode('#0a2a43', 'blanchedalmond', true);
}

/**
 * @description set the lightmode
 * @returns {void}
 */
function lightmode() {
    mode('blanchedalmond', '#0a2a43', false);
}

function mode(backgroundColor, fontColor, isDarkmode) {
    const tags = ['h1', 'h2', 'h3', 'p'];
    for (let i in tags) {
        let tagElements = document.getElementsByTagName(tags[i]);
        for (let i = 0; i < tagElements.length; i++) {
            tagElements[i].style.color = fontColor;
        }
    }
    document.body.style.backgroundColor = backgroundColor;

    for (const element of document.getElementsByClassName(
        'chaptersOverviewButton'
    )) {
        element.style.color = fontColor;
    }

    for (let e of sidebar) {
        if (!e.hasOwnProperty('darkImg')) {
            document.getElementById(e.id).style.color = fontColor;
            continue;
        }
        document.getElementById(e.id + 'Image').src = isDarkmode
            ? e.lightImg
            : e.darkImg;
    }
    document.getElementById('botButton').style.color = fontColor;
}

/**
 * @description scroll to the top of the page
 * @returns {void}
 */
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function goToChapter(chapterId) {
    for (let i in chapters) {
        if (chapters[i].id === chapterId) {
            document.body.scrollTop = chapters[i].from; // For Safari
            document.documentElement.scrollTop = chapters[i].from; // For Chrome, Firefox, IE and Opera
        }
    }
}

/**
 * Show the sidebar on the left side of the page
 * @param {int} value the current scroll position
 */
function showSideBar(value) {
    for (let i in sidebar) {
        let e = document.getElementById(sidebar[i].id);

        if (value < 1000) {
            e.style.left = '-80px';
            turnOffChapterSelect();
        } else if (value < 1200) {
            e.style.left = -80 + value / 2 - 500 + 'px';
            turnOffChapterSelect();
        } else if (value > 20000) {
            e.style.left = '-80px';
            turnOffChapterSelect();
        } else if (value > 19800) {
            e.style.left = 20 - (value / 2 - 9900) + 'px';
            turnOffChapterSelect();
        } else {
            e.style.left = '20px';
        }
    }
}

function toggleChapterSelect() {
    if (isChapterSelectVisible) {
        document.getElementById('scrollToTop').style.top = '230px';
        document.getElementById('languageButton').style.top = '160px';
        document.getElementById('chaptersOverview').style.display = 'none';
    } else {
        document.getElementById('scrollToTop').style.top = '340px';
        document.getElementById('languageButton').style.top = '270px';
        document.getElementById('chaptersOverview').style.display = 'block';
    }
    isChapterSelectVisible = !isChapterSelectVisible;
}
function turnOffChapterSelect() {
    document.getElementById('scrollToTop').style.top = '230px';
    document.getElementById('languageButton').style.top = '160px';
    document.getElementById('chaptersOverview').style.display = 'none';
    isChapterSelectVisible = false;
}

function toggleLanguage() {
    setLanguage(isEnglish ? 'de' : 'en');
    isEnglish = !isEnglish;
}

function setLanguage(language) {
    if (language != 'en' && language != 'de') return;
    console.log('toggle');

    for (let e of languageContent) {
        document.getElementById(e.id).innerHTML = e[language];
    }

    document.getElementById('languageButton').innerHTML =
        language == 'en' ? 'de' : 'en';
}

// **********
// ***GAME***
// **********

let BALLSPEED = 10;
const PLAYERSPEED = 15;

let bounces = 0;
let p1Count = 0;
let p2Count = 0;

let ballImg = document.getElementById('ballImg');

left.style.left = '0px';
right.style.right = '0px';

let p2 = 80;
let p1 = 80;
let key = {};
let ball = {};

let botMode = true;

let gameStarted = false;

let loopIntervalID = 0;
let requestAnimationFrameID = 0;

function initGame() {
    if (gameStarted) return;
    gameStarted = true;
    /*  setTimeout(() => {
        left.style.left = '0px';
        right.style.left = windows.innerWidth - 300 + 'px';
    }, 1); */

    document.getElementById('counter1').style.display = 'block';
    document.getElementById('counter2').style.display = 'block';
    ballImg.style.display = 'block';

    p1Count = 0;
    p2Count = 0;
    BALLSPEED = 10;
    p2 = 80;
    p1 = 80;
    let introductionKeys = document.getElementsByClassName('introductionKeys');
    for (let i = 0; i < introductionKeys.length; i++) {
        introductionKeys[i].style.display = 'block';
    }

    if (botMode) {
        document.getElementById('introductionI').style.display = 'none';
        document.getElementById('introductionK').style.display = 'none';
    }

    document.getElementById('introductionW').style.top = '50px';
    document.getElementById('introductionI').style.top = '50px';

    document.getElementById('introductionS').style.bottom = '50px';
    document.getElementById('introductionK').style.bottom = '50px';

    document.getElementById('introductionW').style.left = '100px';
    document.getElementById('introductionS').style.left = '100px';

    document.getElementById('introductionI').style.right = '100px';
    document.getElementById('introductionK').style.right = '100px';

    document.getElementById('botButton').style.display = 'block';
    document.getElementById('botButton').style.left =
        window.innerWidth / 2 - 50 + 'px';

    setTimeout(hideIntroductionKeys, 5000);

    start();
    loopIntervalID = setInterval(loop, 1000 / 60);

    document.addEventListener('keydown', (e) => {
        key[e.keyCode] = true;
    });
    document.addEventListener('keyup', (e) => {
        key[e.keyCode] = false;
    });
    draw();
}

function stopGame() {
    gameStarted = false;
    document.getElementById('counter1').style.display = 'none';
    document.getElementById('counter2').style.display = 'none';
    ballImg.style.display = 'none';
    clearInterval(loopIntervalID);
    cancelAnimationFrame(requestAnimationFrameID);
    left.style.top = '50px';
    right.style.top = '50px';
    document.getElementById('botButton').style.display = 'none';

    hideIntroductionKeys();
}

function hideIntroductionKeys() {
    let introductionKeys = document.getElementsByClassName('introductionKeys');
    for (let i = 0; i < introductionKeys.length; i++) {
        introductionKeys[i].style.display = 'none';
    }
}

function start() {
    document.getElementById('counter1').innerHTML = p1Count;
    document.getElementById('counter2').innerHTML = p2Count;
    //get random int within window.innerHeight
    BALLSPEED = Math.floor((p1Count + p2Count) / 4) + 10;
    bounces = 0;

    document.getElementById('ballImg').src =
        Math.random() > 0.5
            ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8uMZEltKkRFonb2+sJsKW54+ATsab2/PyW1tDR7etKvbNXwLZBu7HX7uuAzsij29YaHou+v9vf4O1ixbzJ6ea449/s+PdyycIwt63h8/GZ19Gt3tro9vVnxr3U7eqK0svh+9smAAAEA0lEQVR4nO3ccVPiMBAF8BpYokIVaNH2ROX7f8q782AGkrRsq1z3Zd77Ezud/KZQu8mmxV3uKaYewM1DIX4oxA+F+KEQPxTih0L8UIgfCvFDIX7Sws0MMRu9cLOt5niptkliUjirCsRUM71wPvVgR2VOIYXmQyGF9kMhhfZDIYX2QyGF9kMhhfZDIYX2QyGF9kMhhfZDIYX2QyGF9kMhhfZDIYX2QyGF9kMhhfbz48J62Zvy6fzg3XKlSd0c9rt3K8LSu77IhfBFeg8+xXsvIr7Zv1oQLvsHeylc6IQnqMhqkbXwC+mGGsGEf8+w/JW58M851rkLnTS5C53UuQudfOQudPKWuzA4UY5C12YvlH3uQucmEpbyL+Fw/PHzzx8Tyss0wt3iKy8hsDn+4aI8iIQ+naTQr6YRHnMfjMon7+6h0H88J9LUpaSQoiqm/pvwQSPs/Bfwum7jL7Tua2pM+Nh9xof4p616PMURFvuIWGYmLJ7DH6PkJgzP6URTCyMJo4t45XBAYXS4Zs4GSvgrPFzzaAolfA0P10zYYAuzu4b5f0vDRQDZ5SZswv8Wn72H4wnfw8c2VXGBJFyFzzReMxIgYROVy6oSGEb4FC9Mpqtq48KOCvh9XydmdFQ3GmPCjnhJzmLoJtsghB3uQ+5C0fUu4Aq9cvkJV6i8hLhCOShHgir0qnk2aKG6eQhUqJplQxaqF4BBhb4d0sUHKJTnAeMAFEqpmbqAFXpZDm5ORBJK+zCsac+i8LTanyyXxvTPWhP6/eMph4iobS8xLTyv2tvoGvr7DIRn8zS7kavaOMKijr+nAx5lEITRBLBzy7yEReJmo2uDghEW0TXU9SYACeMNJ8r5NRhhsYy/p4OfamwLn+KLqGvXgxHGTUK6/gsg4X3i0TwvYaKZTZJnwhUWZXQNtVPBKMLH+Gaj300CIYzaE5QtGEDCsE3I6bdagAiLdXyzGbI9D0CYqIVlQC18s93qo3r108Lv1cI/Ltyvv/IWjqk+ft6736KjFyNRC6uaFG4jLCW9CeS4N6R/z0yHMFELqxfXjO176uqn+c7EG4Yw/FW7ARNvIMJELaxdnwERfqMWRhGG7cH6WhhFOL4WhhFGG2bcVH1ttxImauH0kyCucGwtDCRM1MKal0cACYuPUbUwkjBRCytuNrbeE3Vlv8VbXAtfb/W+2bu+2iBl6l1fi7a8SHulKCqjtFcX9/m+Ngrth0IK7YdCCu2HQgrth0IK7YdCCu2HQgrth0IK7YdCCu2HQgrth0IK7YdCCu2HQgrth0IK7YdCCu2HwnNhNfVgR6XSCzfbao6XartRC+82M8QkgR3CnEIhfijED4X4oRA/FOKHQvxQiB8K8UMhfvIX/gawFaifBbAPIwAAAABJRU5ErkJggg=='
            : 'data:image/png;base64,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';

    ball = {
        x: window.innerWidth / 2,
        y: Math.floor(Math.random() * (window.innerHeight - 200)) + 100,
        speedX: BALLSPEED * (Math.random() * 2 - 1 > 0 ? 1 : -1),
        speedY: 0,
    };
}

function loop() {
    //w
    if (key[87] && p1 > -30) {
        p1 -= PLAYERSPEED;
    }
    //s
    if (key[83] && p1 < window.innerHeight - 240) {
        p1 += PLAYERSPEED;
    }
    //i
    if (key[73] && p2 > -30 && !botMode) {
        p2 -= PLAYERSPEED;
    }
    //k
    if (key[75] && p2 < window.innerHeight - 240 && !botMode) {
        p2 += PLAYERSPEED;
    }

    if (botMode && ball.x > window.innerWidth / 3) {
        let random = Math.floor(Math.random() * 20);
        let direction = ball.y > p2 + 120 ? 1 : -1;
        if (random < 5) {
            //direction *= -1;
            direction = 0;
        }
        let newP2 = p2 + direction * PLAYERSPEED;
        let distance = Math.abs(newP2 + 120 - ball.y);
        if (newP2 > -30 && newP2 < window.innerHeight - 240 && distance > 20) {
            p2 = newP2;
        }
    }

    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (
        (ball.x < 133 && ball.x > 70) ||
        (ball.x + 50 > window.innerWidth - 133 &&
            ball.x + 50 < window.innerWidth - 70)
    ) {
        if (ball.y > p1 && ball.y < p1 + 240 && ball.speedX < 0) {
            bounces++;
            //let angle = ((ball.y - p1) / 240) * 2 * Math.PI;
            //ball.speedY = Math.sin(angle) * 10;
            let relativeIntersectY = p1 + 120 - ball.y;
            let normalizedRelativeIntersectionY = relativeIntersectY / 120;
            let bounceAngle =
                normalizedRelativeIntersectionY * ((5 * Math.PI) / 12);
            ball.speedX =
                BALLSPEED * Math.cos(bounceAngle) * (1 + (1 - 1 / bounces));
            ball.speedY =
                BALLSPEED * -Math.sin(bounceAngle) * (1 + (1 - 1 / bounces));
        } else if (ball.y > p2 && ball.y < p2 + 240 && ball.speedX > 0) {
            bounces++;

            let relativeIntersectY = p2 + 120 - ball.y;
            let normalizedRelativeIntersectionY = relativeIntersectY / 120;
            let bounceAngle =
                normalizedRelativeIntersectionY * ((5 * Math.PI) / 12);
            ball.speedX =
                BALLSPEED * -Math.cos(bounceAngle) * (1 + (1 - 1 / bounces));
            ball.speedY =
                BALLSPEED * -Math.sin(bounceAngle) * (1 + (1 - 1 / bounces));
        }
    }
    //bounce off top and bottom
    if (ball.y < 0 || ball.y + 50 > window.innerHeight) ball.speedY *= -1;

    // got on left side
    if (ball.x < 0) {
        p2Count++;
        start();
    }
    // got on right side
    if (ball.x + 50 > window.innerWidth) {
        p1Count++;
        start();
    }
}

function draw() {
    left.style.top = p1 + 'px';
    right.style.top = p2 + 'px';

    ballImg.style.left = ball.x + 'px';
    ballImg.style.top = ball.y + 'px';

    requestAnimationFrameID = requestAnimationFrame(draw);
}

function toggleGameMode() {
    botMode = !botMode;
    stopGame();
    initGame();
}
