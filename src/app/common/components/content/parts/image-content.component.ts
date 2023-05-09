import { Component, Input } from '@angular/core';

import { ImageVisualTypeConstants } from '../../../constants/content.constants';
import ContentInfo from '../../../contents/content-info';

const { fullImageToConpact } = ImageVisualTypeConstants;

@Component({
    selector: 'image-content',
    template: `
        <span [ngSwitch]="visualType">
            <img
                *ngSwitchCase="fullImageToConpact"
                [src]="content.src"
                width="60%"
                height="60%"
            >
            <img
                *ngSwitchDefault
                [src]="content.src"
            >
        </span>
    `
})
export default class ImageContentComponent {
    @Input() content: ContentInfo;
    @Input() visualType: ImageVisualTypeConstants;

    fullImageToConpact = fullImageToConpact;
}
