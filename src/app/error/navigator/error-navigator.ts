import { Router } from '@angular/router';

import ErrorRouteInfo from '../route/error-route-info';

export default class ErrorNavigator {
    public static unauthorized(router: Router) {
        this.notFound(router);
    }
    public static notFound(router: Router) {
        router.navigate([ErrorRouteInfo.series.notFound]);
    }
    public static internalServerError(router: Router) {
        router.navigate([ErrorRouteInfo.series.systemError]);
    }
}
