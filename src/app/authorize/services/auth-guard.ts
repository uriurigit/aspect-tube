import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import ErrorNavigator from '@error/navigator/error-navigator';
import { getSiteInfoByRoute } from '@site-information/modules/site-info-modules';
import { isPublic } from '../modules/authorize-controller';

@Injectable()
export default class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        const siteInfo = getSiteInfoByRoute(next.url[0].path);
        if (siteInfo) {
            if (isPublic(siteInfo)) {
                return true;
            } else {
                ErrorNavigator.unauthorized(this.router);
                return false;
            }
        }

        return true;
    }
}
