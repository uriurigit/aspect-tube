import { path } from '@common/modules/path/path-utils';
import Constitution from '@material/constitution';
import { SiteInfoListManager } from '@site-information/site-info';
import writeJson from '../../file-system/write-json';

const {
    app,
    appCollection: {
        appKit,
        authorize,
        common,
        debug,
        error,
        outside,
        site,
        siteInformation
    },
    environments,
    material,
    scripts,
    src,
    tsconfig
} = Constitution;

export default class TsConfigUpdater {
    public async update() {
        const jsonData = await import(`../../../${tsconfig}`);

        this.updateCompilerOptions(jsonData);

        await writeJson(`./${tsconfig}`, jsonData);
    }

    private updateCompilerOptions(jsonData) {
        const { compilerOptions } = jsonData;

        compilerOptions.baseUrl = src;
        compilerOptions.paths = {
            ...this.createPaths(app, this.convertList([appKit, authorize, common, debug, error, outside, siteInformation])),
            ...this.createPaths(path(app, site), SiteInfoListManager.define),
            ...this.createPaths('', this.convertList([environments])),
            ...this.createPaths('..', this.convertList([material, scripts])),
        };
    }

    private createPaths(root, list) {
        const paths = {};
        list.forEach(({ meta }) => {
            const rootPath = `@${meta.src.dirName}/*`;
            const patternList = [path(root, meta.src.dirName, '*')];
            paths[rootPath] = patternList;
        });
        return paths;
    }

    private convertList(dirList) {
        return dirList.map((dirName) => ({
            meta: {
                src: {
                    dirName
                }
            }
        }));
    }
}
