import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import VideoContentModule from './video/video-content.module';
import ContentComponent from './content.component';
import ImageContentComponent from './parts/image-content.component';
import VideoContentComponent from './video/video-content.component';

@NgModule({
    declarations: [
        ContentComponent,
        ImageContentComponent
    ],
    imports: [
        CommonModule,
        VideoContentModule
    ],
    exports: [
        ContentComponent,
        ImageContentComponent,
        VideoContentComponent
    ]
})
export default class ContentModule { }
