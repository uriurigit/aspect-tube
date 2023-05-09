import { path } from '@common/modules/path/path-utils';

export default class RouteInfo {
    public static readonly root;
    public static readonly child = {};
    public static get series(): any {
        let series = {};
        Object.keys(this.child).forEach((route) => {
            series = {
                ...series,
                [route]: path(this.root, this.child[route])
            };
        });
        return series;
    }
}
