import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
    PublicSite,
    AuthorizeSiteComponent
} from './authorize-site/authorize-site.component';
import {
    DevelopmentComponent,
    ProductionComponent
} from './environments/environments.component';

const instanceList = [
    AuthorizeSiteComponent,
    DevelopmentComponent,
    ProductionComponent,
    PublicSite
];

@NgModule({
    declarations: instanceList,
    imports: [
        CommonModule
    ],
    exports: instanceList
})
export default class AuthorizeModule { }
