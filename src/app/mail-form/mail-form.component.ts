import { Component } from '@angular/core';

@Component({
    selector: 'app-mail-form',
    templateUrl: './mail-form.component.html',
    styleUrls: ['./mail-form.component.sass'],
})
export class MailFormComponent {
    name: string = '';
    email: string = '';
    message: string = '';

    submitForm() {
        const message = `My name is ${this.name}. My email is ${this.email}. My message: ${this.message}`;
        alert(message);
    }
}
