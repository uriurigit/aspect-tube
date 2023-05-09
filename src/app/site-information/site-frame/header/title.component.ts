import { Component, Input } from '@angular/core';

@Component({
    selector: 'header-title',
    template: `
        <span id="title">
            {{title}}
        </span>
    `
})
export default class TitleComponent {
    @Input() title: string;
}
