import { Component, Input } from '@angular/core';

import { VideoVisualTypeConstants } from '../../../constants/content.constants';

const {
    fullVideoToConpact,
    externalVideo,
    youtubeVideo
} = VideoVisualTypeConstants;

@Component({
    selector: 'video-content',
    template: `
        <span [ngSwitch]="visualType">
            <full-video-to-conpact *ngSwitchCase="fullVideoToConpact" [url]="url"></full-video-to-conpact>
            <external-video *ngSwitchCase="externalVideo" [url]="url"></external-video>
            <youtube-video *ngSwitchCase="youtubeVideo" [url]="url"></youtube-video>
            <video
                *ngSwitchDefault
                [src]="url"
            >
                <p>no support video</p>
            </video>
        </span>
    `
})
export default class VideoContentComponent {
    @Input() url: string;
    @Input() visualType: VideoVisualTypeConstants;

    readonly fullVideoToConpact = fullVideoToConpact;
    readonly externalVideo = externalVideo;
    readonly youtubeVideo = youtubeVideo;
}
