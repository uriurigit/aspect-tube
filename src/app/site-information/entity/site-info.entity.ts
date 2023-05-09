import { AuthorizeConstants } from '@authorize/constants/authorize.constants';

export default interface SiteInfoEntity {
    browserTitle: string;
    headerTitle: string;
    linkTitle: string;
    description: string;
    font: string;
    color: string;
    authorize: AuthorizeConstants;
    meta: {
        srcDirName: string;
        assetsDirName: string;
        src: {
            dirName: string;
        },
        assets: {
            dirName: string;
        },
        module: {
            fileName: string;
            className: string;
            fullPath: string;
        },
        component: {
            selector: string;
            id: string;
            fileName: string;
            className: string;
            fullPath: string;
        },
        route: {
            routeName: string;
            fileName: string;
            className: string;
            fullPath: string;
        }
    };
    getSelector: () => string;
    getRouteName: () => string;
}
