import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import Accordion from './accordion.component';
import Panel from './parts/panel.directive';
import PanelContent from './parts/panel-content.directive';
import PanelTitle from './parts/panel-title.directive';

@NgModule({
    declarations: [
        Accordion,
        Panel,
        PanelContent,
        PanelTitle
    ],
    imports: [
        CommonModule
    ],
    exports: [
        Accordion,
        Panel,
        PanelContent,
        PanelTitle
    ]
})
export default class AccordionModule { }
