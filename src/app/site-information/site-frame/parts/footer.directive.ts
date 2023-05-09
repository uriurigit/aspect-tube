import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: 'ng-template[Footer]' })
export default class Footer {
    constructor(public templateRef: TemplateRef<any>) {}
}
