import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import ImagePanelComponent from './image-panel.component';

@NgModule({
    declarations: [
        ImagePanelComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ImagePanelComponent
    ]
})
export default class ImagePanelModule { }
