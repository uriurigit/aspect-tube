import { Component, Input } from '@angular/core';

@Component({
    selector: 'full-video-to-conpact',
    template: `
        <video
            [src]="url"
            width="70%"
            height="70%"
            controls
            muted
        >
            <no-support-video></no-support-video>
        </video>
    `
})
export default class FullVideoToConpactComponent {
    @Input() url;
}
