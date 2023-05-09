import { Component } from '@angular/core';

import { developmentMode, productionMode } from '@environments/environments';

// https://www.codementor.io/christiannwamba/build-custom-directives-in-angular-2-jlqrk7dpw

const envProps = (selector, authorize) => ({
    selector: `[${selector}]`,
    template: `<ng-content *ngIf="${authorize}"></ng-content>`
});

@Component(envProps('development', developmentMode))
export class DevelopmentComponent { }

@Component(envProps('production', productionMode))
export class ProductionComponent { }
