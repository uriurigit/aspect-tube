import RouteInfo from '@app-kit/route/route-info';

export default class ErrorRouteInfo extends RouteInfo {
    public static readonly root = 'error';
    public static readonly child = {
        notFound: 'not-found',
        systemError: 'system-error'
    };
}
