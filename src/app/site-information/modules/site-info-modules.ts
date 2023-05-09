import { get } from 'lodash';

import { AuthorizeConstants } from '@authorize/constants/authorize.constants';
import { path } from '@common/modules/path/path-utils';
import { SiteInfoListManager } from '../site-info';

export const getSiteInfo = (value: string, searchKey: string = 'meta.component.className'): any => {
    return SiteInfoListManager.expansion.find((siteInfo) => get(siteInfo, searchKey) === value);
};
export const getSelector = (component): string => {
    return getSiteInfo(component.name).getSelector();
};
export const getRouteName = (routeInfo): string => {
    return getSiteInfo(routeInfo.name, 'meta.route.infoClassName').getRouteName();
};
export const getContentsPath = (siteInfo, pathName: string): string => {
    return path(siteInfo.meta.assets.dirName, 'contents', pathName);
};
export const getSiteInfoByRoute = (routeName): any => {
    return getSiteInfo(routeName, 'meta.route.routeName');
};
