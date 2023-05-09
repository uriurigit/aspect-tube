import { lowerCamelToKebab, lowerCamelToUpperCamel } from '@common/modules/naming-rule/naming-rule';
import { path } from '@common/modules/path/path-utils';
import Constitution from '@material/constitution';

const { siteCollection } = Constitution;

export default function getMetadata(constantKey) {
    const key = lowerCamelToKebab(constantKey);
    const objKey = lowerCamelToUpperCamel(constantKey);

    const metadata = {
        constant: constantKey,
        srcDirName: key,
        assetsDirName: key,
        src: {
            dirName: key,
        },
        assets: {
            dirName: key,
        },
        module: {
            fileName: `${key}.module`,
            className: `${objKey}Module`,
            fullPath: ''
        },
        component: {
            selector: key,
            id: key,
            fileName: `${key}.component`,
            className: `${objKey}Component`,
            fullPath: ''
        },
        route: {
            routeName: key,
            fileName: `${key}-route`,
            className: `${objKey}Route`,
            infoFileName: `${key}-route-info`,
            infoClassName: `${objKey}RouteInfo`,
            fullPath: ''
        }
    };
    setExtension(metadata);

    return metadata;
}

function setExtension(metadata) {
    const root = `@${metadata.src.dirName}`;
    metadata.module.fullPath = path(root, metadata.module.fileName);
    metadata.component.fullPath = path(root, siteCollection.components, metadata.component.fileName);
    metadata.route.fullPath = path(root, siteCollection.route, metadata.route.fileName);
}
