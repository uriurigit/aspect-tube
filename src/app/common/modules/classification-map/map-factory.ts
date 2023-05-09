import { isObject } from 'lodash';

import StringBuffer from '@common/modules/string-buffer/string-buffer';
import MapBuffer from '@common/modules/map-buffer';

export const mapSet = {
    blunk: '&nbsp;&nbsp;',
    end: '┗',
    branch: '┣',
    through: '┃'
};

export class MapFactory {
    private blunk: string;
    private end: string;
    private branch: string;
    private through: string;

    constructor({ blunk, end, branch, through }) {
        this.blunk = blunk;
        this.end = end;
        this.branch = branch;
        this.through = through;
    }

    public mapping(root: string, obj: Object): string {
        return new StringBuffer()
            .appendLine(root)
            .append(this.createMap(obj))
            .toString();
    }

    private createMap(obj: Object, indentList = []): string {
        const sb = new StringBuffer();
        const keys = Object.keys(obj);
        keys.forEach((key, index) => {
            const block = (index === keys.length - 1)
                ? { branch: this.end, indent: this.blunk }
                : { branch: this.branch, indent: this.through }
            ;

            sb.append(this.indent(indentList, this.blunk))
                .append(block.branch)
                .append(this.blunk)
                .appendLine(key);

            const next = obj[key];
            if (isObject(next)) {
                sb.append(this.createMap(next, indentList.concat(block.indent)));
            }
        });

        return sb.toString();
    }

    private indent(indentList, subIndent): string {
        const sb = new StringBuffer();
        indentList.forEach((indent) => {
            sb.append(indent).append(subIndent);
        });

        return sb.toString();
    }
}

export class MapFactory2 {
    private blunk: string;
    private end: string;
    private branch: string;
    private through: string;

    constructor({ blunk, end, branch, through }) {
        this.blunk = blunk;
        this.end = end;
        this.branch = branch;
        this.through = through;
    }

    public mapping(root: string, obj: Object): Array<any> {
        return new MapBuffer()
            .appendLine(root)
            .merge(this.createMap(obj))
            .toArray();
    }

    private createMap(obj: Object, indentList = []): Array<any> {
        const mb = new MapBuffer();
        const keys = Object.keys(obj);
        keys.forEach((key, index) => {
            const block = (index === keys.length - 1)
                ? { branch: this.end, indent: this.blunk }
                : { branch: this.branch, indent: this.through }
            ;

            mb.appendRow(this.indent(indentList, this.blunk))
                .appendCell(block.branch)
                .appendCell(this.blunk)
                .appendLine(key);

            const next = obj[key];
            if (isObject(next)) {
                mb.merge(this.createMap(next, indentList.concat(block.indent)));
            }
        });

        return mb.toArray();
    }

    private indent(indentList, subIndent): Array<any> {
        const mb = new MapBuffer();
        indentList.forEach((indent) => {
            mb.appendCell(indent).appendCell(subIndent);
        });

        return mb.toArray();
    }
}
