import {
    AfterContentChecked,
    Component,
    ContentChildren,
    Input,
    OnInit,
    Output,
    QueryList
} from '@angular/core';
import { Title } from '@angular/platform-browser';

import { getSiteInfo } from '@site-information/modules/site-info-modules';
import Body from './parts/body.directive';
import Footer from './parts/footer.directive';
import Header from './parts/header.directive';

@Component({
    selector: 'site-frame',
    template: `
        <authorize-site [siteInfo]="siteInfo">
            <ng-template PublicSite>
                <div id="site-frame">
                    <div id="header">
                        <span *ngIf="headerTpl; else defaultHeader">
                            <ng-template [ngTemplateOutlet]="headerTpl?.templateRef"></ng-template>
                        </span>
                        <ng-template #defaultHeader>
                            <div id="header-up">
                                <header-title [title]="siteInfo.headerTitle"></header-title>
                            </div>
                        </ng-template>
                    </div>
                    <div id="body">
                        <ng-template [ngTemplateOutlet]="bodyTpl?.templateRef"></ng-template>
                    </div>
                    <div id="footer">
                        <span *ngIf="footerTpl; else defaultFooter">
                            <ng-template [ngTemplateOutlet]="footerTpl?.templateRef"></ng-template>
                        </span>
                        <ng-template #defaultFooter>
                        </ng-template>
                    </div>
                </div>
            </ng-template>
        </authorize-site>
    `,
    styleUrls: ['site-frame.scss'],
    providers: [Title]
})
export default class SiteFrameComponent implements OnInit, AfterContentChecked {
    @ContentChildren(Body) bodys: QueryList<Body>;
    @ContentChildren(Header) headers: QueryList<Header>;
    @ContentChildren(Footer) footers: QueryList<Footer>;
    @Input() parent: any;
    @Output() siteInfo: any;
    bodyTpl: Body | null;
    headerTpl: Header | null;
    footerTpl: Footer | null;

    constructor(private title: Title) {}

    ngOnInit() {
        if (this.parent) {
            this.siteInfo = getSiteInfo(this.parent.__proto__.constructor.name);
        }
        this.title.setTitle(this.siteInfo.browserTitle);
    }

    ngAfterContentChecked() {
        this.bodyTpl = this.bodys.first;
        this.headerTpl = this.headers.first;
        this.footerTpl = this.footers.first;
    }
}
