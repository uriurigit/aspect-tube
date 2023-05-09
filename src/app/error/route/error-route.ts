import ErrorRouteInfo from './error-route-info';
import {
    NotFoundComponent,
    SystemErrorComponent
} from '../components/error.components';
const { root, child } = ErrorRouteInfo;

const childRoute = [
    {
        path: '',
        redirectTo: child.notFound,
        pathMatch: 'full'
    },
    {
        path: child.notFound,
        component: NotFoundComponent
    },
    {
        path: child.systemError,
        component: SystemErrorComponent
    }
];
export default {
    path: root,
    children: childRoute
};
