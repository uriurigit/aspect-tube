import Constitution from '@material/constitution';
import ProjectInformation from '@material/project-information';
import writeJson from '../../file-system/write-json';

const {
    packageConfig
} = Constitution;

export default class PackageUpdater {
    public async update() {
        const jsonData = await import(`../../../${packageConfig}`);

        jsonData.name = ProjectInformation.projectName;

        await writeJson(`./${packageConfig}`, jsonData);
    }
}
