import FileSystem from '@common/modules/file-system/file-system';
import StringBuffer from '@common/modules/string-buffer/string-buffer';
import { path } from '@common/modules/path/path-utils';
import Constitution from '@material/constitution';
import { SiteInfoListManager } from '@site-information/site-info';
import createDirectory from '../../file-system/create-directory';

const {
    moduleList,
    routeList
} = Constitution;

export default class SiteInformationResourceCreator {
    public async create(root: string) {
        await this.createModuleList(path(root, 'module'));
        await this.createRouteList(path(root, 'route'));
    }

    private async createModuleList(moduleRoot) {
        await createDirectory(moduleRoot);

        const importSb = new StringBuffer();
        const moduleSb = new StringBuffer();
        SiteInfoListManager.expansion.forEach(({ meta: { module } }) => {
            importSb
                .append('import ')
                .append(module.className)
                .append(' from ')
                .semicolonLine(`'${module.fullPath}'`);
            moduleSb
                .indent()
                .commaLine(module.className);
        });

        await new FileSystem().writeFile(
            path(moduleRoot, moduleList),
            new StringBuffer()
                .appendLine(importSb.string)
                .appendLine('export const moduleList = [')
                .append(moduleSb.string)
                .semicolonLine(']')
                .toString()
        );
    }

    private async createRouteList(routeRoot) {
        await createDirectory(routeRoot);

        const importSb = new StringBuffer();
        const routeSb = new StringBuffer();
        SiteInfoListManager.expansion.forEach(({ meta: { route } }) => {
            importSb
                .append('import ')
                .append(route.className)
                .append(' from ')
                .semicolonLine(`'${route.fullPath}'`);
            routeSb
                .indent()
                .commaLine(route.className);
        });

        await new FileSystem().writeFile(
            path(routeRoot, routeList),
            new StringBuffer()
                .appendLine(importSb.string)
                .semicolonLine('export const redirectTo = CrashBandicootRoute.path')
                .appendLine('export const routeList = [')
                .append(routeSb.string)
                .semicolonLine(']')
                .toString()
        );
    }
}
