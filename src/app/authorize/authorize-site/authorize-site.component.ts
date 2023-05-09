import {
    AfterContentChecked,
    Component,
    ContentChildren,
    Directive,
    Input,
    TemplateRef,
    QueryList
} from '@angular/core';
import { Router } from '@angular/router';

import ErrorNavigator from '@error/navigator/error-navigator';
import { isPublic } from '../modules/authorize-controller';

@Directive({ selector: 'ng-template[PublicSite]' })
export class PublicSite {
    constructor(public templateRef: TemplateRef<any>) {}
}

@Component({
    selector: 'authorize-site',
    template: `
        <ng-template [ngTemplateOutlet]="publicSiteTpl?.templateRef"></ng-template>
    `
})
export class AuthorizeSiteComponent implements AfterContentChecked {
    @ContentChildren(PublicSite) publicSites: QueryList<PublicSite>;
    @Input() siteInfo: any;
    publicSiteTpl: PublicSite | null;

    constructor(private router: Router) { }

    ngAfterContentChecked() {
        if (isPublic(this.siteInfo)) {
            this.publicSiteTpl = this.publicSites.first;
        } else {
            ErrorNavigator.unauthorized(this.router);
        }
    }
}
