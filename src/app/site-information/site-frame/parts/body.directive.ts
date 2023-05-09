import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: 'ng-template[Body]' })
export default class Body {
    constructor(public templateRef: TemplateRef<any>) {}
}
