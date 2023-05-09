import { Component, Input, OnInit } from '@angular/core';

import { ContentConstants } from '../../constants/content.constants';
import ContentDetailEntity from '../../entity/content-detail.entity';
import { template } from '../../modules/template-engine/template-engine';

const { image, video } = ContentConstants;

@Component({
    selector: 'content',
    template: `
        <div [innerHTML]="template(annotation.up)"></div>
        <span [innerHTML]="template(annotation.left)"></span>
        <span [ngSwitch]="content.type">
            <span *ngSwitchCase="image">
                <image-content [content]="content" [visualType]="contentDetail.visualType"></image-content>
            </span>
            <span *ngSwitchCase="video">
                <video-content [url]="content.src" [visualType]="contentDetail.visualType"></video-content>
            </span>
        </span>
        <span [innerHTML]="template(annotation.right)"></span>
        <div [innerHTML]="template(annotation.bottom)"></div>
    `
})
export default class ContentComponent implements OnInit {
    @Input() contentDetail: ContentDetailEntity = {
        content: undefined,
        visualType: undefined,
        annotation: undefined
    };

    content = {};
    annotation = {};

    readonly image = image;
    readonly video = video;
    readonly template = template;

    ngOnInit() {
        this.content = (this.contentDetail.content || {});
        this.annotation = (this.contentDetail.annotation || {});
    }
}
