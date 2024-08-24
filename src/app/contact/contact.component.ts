import { Component, Input, HostListener } from '@angular/core';
import { AppComponent } from '../app.component';
import getContacts from 'src/data/contact';
import { Contact } from '../utils/classes';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
    @Input() start: number = 2000;
    @Input() length: number = 3000;

    offsetBottom: number = -600;
    small: boolean = false;

    contacts: Contact[] = getContacts();

    ngOnInit(): void {
        this.setOffsetBottom(window.scrollY);
        this.setContactActivity(window.scrollY);
    }

    @HostListener('window:scroll', ['$event'])
    OnScroll(event: any) {
        this.setOffsetBottom(window.scrollY);
        this.setContactActivity(window.scrollY);
    }

    setOffsetBottom(y: number): void {
        if (y < this.start - 500) {
            this.offsetBottom = -600;
        } else if (y < this.start) {
            this.offsetBottom = -100 + (y - this.start);
        } else if (y > this.start + this.length) {
            this.offsetBottom = (y - (this.start + this.length)) * 0.5;
        } else {
            this.offsetBottom = -20;
        }
    }

    setContactActivity(y: number): void {
        const section = this.length / this.contacts.length;
        let index = Math.floor((y - this.start) / section);
        if (y >= this.start + this.length) {
            index = this.contacts.length - 1;
        }
        this.contacts.forEach((contact, i) => {
            contact.active = i === index;
        });
    }

    getContactsByState(active: boolean): Contact[] {
        return this.contacts.filter((contact) => contact.active === active);
    }

    openLink(url: string): void {
        window.open(url, '_blank');
    }
}
