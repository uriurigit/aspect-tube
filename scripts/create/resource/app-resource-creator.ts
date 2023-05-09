import { path } from '@common/modules/path/path-utils';
import Constitution from '@material/constitution';
import SiteResourceCreator from './site-resource-creator';
import SiteInformationResourceCreator from './site-information-resource-creator';
import createDirectory from '../../file-system/create-directory';

const {
    app,
    appCollection: { appKit, common, outside, site, siteInformation },
    src
} = Constitution;

export default class AppResourceCreator {
    public async create() {
        const root = path(src, app);
        const appKitRoot = path(root, appKit);
        const commonRoot = path(root, common);
        const outsideRoot = path(root, outside);
        const siteRoot = path(root, site);
        const siteInformationRoot = path(root, siteInformation);

        await createDirectory(appKitRoot);
        await createDirectory(commonRoot);
        await createDirectory(outsideRoot);
        await createDirectory(siteRoot);
        await createDirectory(siteInformationRoot);

        await new SiteResourceCreator().create(siteRoot);
        await new SiteInformationResourceCreator().create(siteInformationRoot);
    }
}
