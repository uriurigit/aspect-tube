import { Component, Input } from '@angular/core';

@Component({
    selector: 'top-navigation',
    template: `
        <div class="navigation-button">
            <button
                class="btn"
                (click)="scrollTop()"
                placement="top"
                ngbTooltip="TOPへ戻る"
            >
                <img [src]="imgSrc">
            </button>
        </div>
    `,
    styleUrls: ['top-navigation.scss']
})
export default class TopNavigationComponent {
    @Input() imgSrc: string;

    scrollTop() {
        window.scrollTo(0, 0);
    }
}
