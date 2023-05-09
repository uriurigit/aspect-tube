import { path } from '@common/modules/path/path-utils';
import Constitution from '@material/constitution';
import { SiteInfoListManager } from '@site-information/site-info';
import createDirectory from '../../file-system/create-directory';

const {
    assets,
    assetsCollection,
    src
} = Constitution;

export default class AssetsResourceCreator {
    public async create() {
        const root = path(src, assets);
        await createDirectory(path(root, assetsCollection.common));

        const assetsRoot = path(root, assetsCollection.site);
        await createDirectory(assetsRoot);
        SiteInfoListManager.expansion.forEach(async ({ meta: { assetsDirName } }) => {
            await createDirectory(path(assetsRoot, assetsDirName));
        });
    }
}
