import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    template: `
        <router-outlet></router-outlet>
    `,
    providers: [Title]
})
export default class AppComponent {
    constructor(private title: Title) {
        this.title.setTitle('no title');
    }
}
