import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import VideoContentComponent from './video-content.component';
import ExternalVideoComponent from './type/external-video.component';
import FullVideoToConpactComponent from './type/full-video-to-conpact.component';
import NoSupportVideoComponent from './type/no-support-video.component';
import YoutubeVideoComponent from './type/youtube-video.component';

@NgModule({
    declarations: [
        ExternalVideoComponent,
        FullVideoToConpactComponent,
        NoSupportVideoComponent,
        VideoContentComponent,
        YoutubeVideoComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        VideoContentComponent
    ]
})
export default class VideoContentModule { }
