import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: 'ng-template[PanelTitle]' })
export default class PanelTitle {
    constructor(public templateRef: TemplateRef<any>) {}
}
