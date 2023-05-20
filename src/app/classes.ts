export class Chapter {
  public name: string;
  public id: number;
  public active: boolean = false;
  public start: number;
  public length: number;

  public static counter: number = 0;

  constructor(
    name: string,
    start: number,
    length: number,
    resetCounter: boolean = false
  ) {
    if (resetCounter) {
      Chapter.counter = 0;
    }
    this.name = name;
    this.length = length;
    this.start = start;
    this.id = Chapter.counter;
    Chapter.counter++;
  }
}

export class TimelinePoint {
  public name: string;
  public description: string;
  public date: string;
  public active: boolean = false;
  public id: number;
  public link: string;

  public static counter: number = 0;

  constructor(
    name: string,
    description: string,
    date: string,
    link: string = '',
    resetCounter: boolean = false
  ) {
    if (resetCounter) {
      TimelinePoint.counter = 0;
    }
    this.name = name;
    this.description = description;
    this.date = date;
    this.link = link;
    this.id = TimelinePoint.counter;
    TimelinePoint.counter++;
  }
}

export class Project {
  public name: string;
  public url: string;
  public img: string;
  public description: string;
  public buttonText: string;
  public active: boolean = false;

  constructor(
    name: string,
    url: string,
    img: string,
    description: string,
    buttonText: string = 'View'
  ) {
    this.name = name;
    this.url = url;
    this.img = img;
    this.description = description;
    this.buttonText = buttonText;
  }
}

export class Skill {
  public name: string;
  public url: string;
  public img: string;
  public x: number;
  public y: number;
  public startX: number;
  public startY: number;
  public currX: number;
  public currY: number;
  public active: boolean = false;

  constructor(name: string, url: string, img: string, x: number, y: number) {
    this.name = name;
    this.url = url;
    this.y = y;
    this.x = x;
    this.img = img;

    let random = Math.floor(Math.random() * 3);
    if (random == 0) {
      // left
      this.startX = -100;
      this.startY = Math.floor(Math.random() * window.innerHeight);
    } else if (random == 1) {
      //right
      this.startX = window.innerWidth + 50;
      this.startY = Math.floor(Math.random() * window.innerHeight);
    } else {
      //top
      this.startY = -100;
      this.startX = Math.floor(Math.random() * window.innerWidth);
    }
    this.currX = this.startX;
    this.currY = this.startY;
  }
}
