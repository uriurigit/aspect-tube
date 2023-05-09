import { isArray, isString } from 'lodash';

import AssetsInfo from '@app-kit/project-information/assets-info';
import { Extension } from './extension';
import { ContentConstants } from '../constants/content.constants';

class PathInfo {
    public static content(name: string, middlePath: Array<string>): string;
    public static content(name: string, middlePath: string): string;
    public static content(name: string, middlePath?: any): string {
        const pathList = this.getPathList(middlePath);
        pathList.push(name);

        return pathList.join('/');
    }

    private static getPathList(middlePath?: any): Array<string> {
        let pathList = [];
        if (isArray(middlePath)) {
            pathList = pathList.concat(middlePath);
        } else if (isString(middlePath)) {
            pathList.push(middlePath);
        }

        return pathList;
    }
}

export default class ContentInfo {
    constructor(protected props: {
        type: ContentConstants,
        root: string,
        hierarchy: string,
        name: string
    }) {}

    get src() {
        return PathInfo.content(this.fullName(), [this.props.root, AssetsInfo.contentsRoot, this.props.hierarchy]);
    }

    get type() {
        return this.props.type;
    }

    private fullName(): string {
        return (0 <= this.props.name.indexOf('.'))
            ? this.props.name
            : `${this.props.name}.${this.defaultExtension()}`;
    }

    private defaultExtension() {
        switch (this.props.type) {
            case ContentConstants.image:
                return Extension.png.valueOf();
            case ContentConstants.video:
                return Extension.mp4.valueOf();
        }
    }
}
