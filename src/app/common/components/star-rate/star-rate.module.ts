import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import StarRateComponent from './star-rate.component';

@NgModule({
    declarations: [
        StarRateComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        StarRateComponent
    ]
})
export default class StarRateModule { }
