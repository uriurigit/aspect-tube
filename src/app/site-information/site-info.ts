import { isNil } from 'lodash';

import { AuthorizeConstants } from '@authorize/constants/authorize.constants';
import SiteInfoEntity from './entity/site-info.entity';
import getMetadata from './modules/extension/get-meta-data';
import setProperty from './modules/extension/set-property';

export default class SiteInfo {
    public static aspectTube = {
        browserTitle: '横断チューブ',
        headerTitle: '横断チューブ',
        linkTitle: '横断チューブ',
        description: '横断チューブ',
        color: '',
        authorize: AuthorizeConstants.public,
        meta: getMetadata('aspectTube')
    };
}
export class SiteInfoListManager {
    private static readonly siteInfoList: Array<SiteInfoEntity>
        = Object.keys(SiteInfo)
        .map((key) => SiteInfo[key])
        .map(setProperty);

    /** 全て */
    public static get all(): Array<SiteInfoEntity> {
        return this.siteInfoList.filter((site) => !isNil(site.authorize));
    }
    /** 定義済みのもの全て */
    public static get define(): Array<SiteInfoEntity> {
        return this.all.filter((site) => AuthorizeConstants.definitionOnly >= site.authorize);
    }
    /** 展開するもの全て */
    public static get expansion(): Array<SiteInfoEntity> {
        return this.all.filter((site) => AuthorizeConstants.inDevelopment >= site.authorize);
    }
    /** 開発完了のもの全て */
    public static get product(): Array<SiteInfoEntity> {
        return this.all.filter((site) => AuthorizeConstants.private >= site.authorize);
    }
    /** 公開するもの全て */
    public static get public(): Array<SiteInfoEntity> {
        return this.all.filter((site) => AuthorizeConstants.public >= site.authorize);
    }
}
