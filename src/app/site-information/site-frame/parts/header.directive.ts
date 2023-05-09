import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: 'ng-template[Header]' })
export default class Header {
    constructor(public templateRef: TemplateRef<any>) {}
}
