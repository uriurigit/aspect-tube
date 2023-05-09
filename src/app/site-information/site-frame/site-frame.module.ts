import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import AuthorizeModule from '@authorize/authorize.module';
import SiteFrameComponent from './site-frame.component';
import CopyRightComponent from './footer/copy-right.component';
import TitleComponent from './header/title.component';
import Body from './parts/body.directive';
import Footer from './parts/footer.directive';
import Header from './parts/header.directive';

@NgModule({
    declarations: [
        Body,
        CopyRightComponent,
        Footer,
        Header,
        SiteFrameComponent,
        TitleComponent
    ],
    imports: [
        AuthorizeModule,
        CommonModule
    ],
    exports: [
        Body,
        Footer,
        Header,
        SiteFrameComponent
    ]
})
export default class SiteFrameModule { }
