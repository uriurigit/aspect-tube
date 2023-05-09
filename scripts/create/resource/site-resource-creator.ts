import FileSystem from '@common/modules/file-system/file-system';
import AngularBuffer from '../../modules/angular-buffer';
import { path } from '@common/modules/path/path-utils';
import Constitution from '@material/constitution';
import { SiteInfoListManager } from '@site-information/site-info';
import createDirectory from '../../file-system/create-directory';
import isExistsFile from '../../file-system/is-exists-file';

const {
    app,
    siteCollection: { components, data, modules, route },
} = Constitution;

export default class SiteResourceCreator {
    public async create(root: string) {
        SiteInfoListManager.expansion.forEach(async ({ meta }) => {
            const siteSubRoot = path(root, meta.src.dirName);
            await createDirectory(siteSubRoot);
            await new SiteCollectionResourceCreator(meta, siteSubRoot).create();
        });
    }
}
class SiteCollectionResourceCreator {
    constructor(private meta: any, private root: string) {}

    public async create() {
        await createDirectory(path(this.root, components));
        await createDirectory(path(this.root, data));
        await createDirectory(path(this.root, modules));
        await createDirectory(path(this.root, route));

        const resourceList = [{
            path: path(this.root, this.meta.module.fileName),
            create: this.createModuleFile.bind(this)
        },
        {
            path: path(this.root, components, this.meta.component.fileName),
            create: this.createComponentFile.bind(this)
        },
        {
            path: path(this.root, route, this.meta.route.infoFileName),
            create: this.createRouteInfoFile.bind(this)
        },
        {
            path: path(this.root, route, this.meta.route.fileName),
            create: this.createRouteFile.bind(this)
        }];
        await this.createFile(resourceList);
    }

    private async createFile(resourceList) {
        for (let index = 0; index < resourceList.length ; index++) {
            const resource = resourceList[index];
            const filePath = `${resource.path}.ts`;
            if (!await isExistsFile(filePath)) {
                await resource.create(filePath);
            }
        }
    }

    private async createComponentFile(filePath) {
        await new FileSystem().writeFile(
            filePath,
            new AngularBuffer()
                .import(['Component'], '@angular/core')
                .line()
                .import(['getSelector'], '@site-information/modules/site-info-modules')
                .line()
                .component({
                    selector: `getSelector(${this.meta.component.className})`,
                    template: `
        <site-frame [parent]="this">
            <ng-template Body>
            </ng-template>
        </site-frame>
`
                })
                .appendLine(`export default class ${this.meta.component.className} { }`)
                .toString()
        );
    }

    private async createRouteInfoFile(filePath) {
        await new FileSystem().writeFile(
            filePath,
            new AngularBuffer()
                .import(['getRouteName'], '@site-information/modules/site-info-modules')
                .import('RouteInfo', '@app-kit/route/route-info')
                .line()
                .appendLine(`export default class ${this.meta.route.infoClassName} extends RouteInfo {`)
                .indent().semicolonLine(`public static readonly root = getRouteName(${this.meta.route.infoClassName})`)
                .appendLine('}')
                .toString()
        );
    }

    private async createRouteFile(filePath) {
        await new FileSystem().writeFile(
            filePath,
            new AngularBuffer()
                .import(this.meta.route.infoClassName, path('.', this.meta.route.infoFileName))
                .import(this.meta.component.className, path('..', components, this.meta.component.fileName))
                .line()
                .appendLine('const childRoute = [')
                .semicolonLine(']')
                .appendLine('export default {')
                .indent().commaLine(`path: ${this.meta.route.infoClassName}.root`)
                .indent().appendLine(`component: ${this.meta.component.className}`)
                .semicolonLine('}')
                .toString()
        );
    }

    private async createModuleFile(filePath) {
        const { component: { className, fileName } } = this.meta;

        await new FileSystem().writeFile(
            filePath,
            new AngularBuffer()
                .import(['CommonModule'], '@angular/common')
                .import(['NgModule'], '@angular/core')
                .line()
                .import('SiteFrameModule', '@site-information/site-frame/site-frame.module')
                .import(className, path('.', components, fileName))
                .line()
                .ngModule({
                    declarations: [className],
                    imports: ['CommonModule', 'SiteFrameModule'],
                    exports: [className]
                })
                .appendLine(`export default class ${this.meta.module.className} { }`)
                .toString()
        );
    }
}
