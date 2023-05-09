import { developmentMode } from '@environments/environments';
import { AuthorizeConstants } from '../constants/authorize.constants';

export const isPublic = (siteInfo: any) => {
    if (developmentMode) {
        return true;
    }
    return AuthorizeConstants.public === siteInfo.authorize;
};
