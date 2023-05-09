import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: 'ng-template[PanelContent]' })
export default class PanelContent {
    constructor(public templateRef: TemplateRef<any>) {}
}
