import AuthGuard from '@authorize/services/auth-guard';
import ErrorRoute from '@error/route/error-route';
import { redirectTo, routeList } from '@site-information/route/route-list';

const appRoute = [{
    path: '',
    redirectTo,
    pathMatch: 'full'
},
...routeList,
ErrorRoute
].map((route) => ({
    ...route,
    canActivate: [AuthGuard]
}));
export default appRoute;
