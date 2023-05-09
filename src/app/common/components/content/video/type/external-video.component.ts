import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'external-video',
    template: `
        <iframe
            id="video-screen"
            sandbox="allow-same-origin allow-forms allow-scripts"
            [class]="class"
            [src]="sanitizer.bypassSecurityTrustResourceUrl(url)">
            allowFullScreen
        </iframe>
        <button (click)="fullScreen()">大画面</button>
    `,
    styleUrls: ['external-video.scss']
})
export default class ExternalVideoComponent {
    @Input() url: string;

    class = '';
    isFullScreen = false;

    constructor(public sanitizer: DomSanitizer) {
        this.updateVideoScreenClass(this.isFullScreen);
    }

    fullScreen() {
        this.isFullScreen = !(this.isFullScreen);
        this.updateVideoScreenClass(this.isFullScreen);
    }

    private updateVideoScreenClass(isFullScreen) {
        this.class = (isFullScreen) ? 'full-screen' : 'normal-screen';
    }
}
