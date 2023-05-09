import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: 'ng-template[Main]' })
export default class Main {
    constructor(public templateRef: TemplateRef<any>) {}
}
