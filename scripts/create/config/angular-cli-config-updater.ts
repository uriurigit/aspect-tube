import Constitution from '@material/constitution';
import ProjectInformation from '@material/project-information';
import { SiteInfoListManager } from '@site-information/site-info';
import writeJson from '../../file-system/write-json';

const {
    angularCliConfig,
    assetsCollection: { common, site },
    assets,
    favicon,
    src
} = Constitution;

export default class AngularCliConfigUpdater {
    public async update() {
        const jsonData = await import(`../../../${angularCliConfig}`);

        this.updateProject(jsonData);
        this.updateApps(jsonData);

        await writeJson(`./${angularCliConfig}`, jsonData);
    }

    private updateProject(jsonData) {
        const { project } = jsonData;

        project.name = ProjectInformation.projectName;
    }

    private updateApps(jsonData) {
        const { apps } = jsonData;
        const app = apps[0];

        app.root = src;
        app.assets = (() => {
            const list = [];
            list.push({
                glob: '**/*',
                input: `./${assets}/${common}`,
                output: `./${common}/`
            });
            SiteInfoListManager.define.forEach(({ meta: { assetsDirName} }) => {
                list.push({
                    glob: '**/*',
                    input: `./${assets}/${site}/${assetsDirName}`,
                    output: `./${assetsDirName}/`
                });
            });
            list.push({
                glob: favicon,
                input: './',
                output: './'
            });
            return list;
        })();
    }
}
