import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'youtube-video',
    template: `
        <iframe
            width="560"
            height="315"
            [src]="sanitizer.bypassSecurityTrustResourceUrl(url)">
            frameborder="0"
            allow="autoplay;encrypted-media"
            allowfullscreen
        ></iframe>
    `
})
export default class YoutubeVideoComponent {
    @Input() url: string;

    constructor(public sanitizer: DomSanitizer) {}
}
