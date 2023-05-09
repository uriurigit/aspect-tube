import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';

import TopNavigationComponent from './top-navigation.component';

@NgModule({
    declarations: [
        TopNavigationComponent
    ],
    imports: [
        CommonModule,
        NgbModule.forRoot(),
    ],
    exports: [
        TopNavigationComponent
    ]
})
export default class TopNavigationModule { }
