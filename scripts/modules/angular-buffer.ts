import { isArray } from 'lodash';
import StringBuffer from '@common/modules/string-buffer/string-buffer';

export default class AngularBuffer extends StringBuffer {
    public import(name: string | Array<string>, moduleName: string): AngularBuffer {
        if (isArray(name)) {
            name = `{ ${(name as Array<string>).join(', ')} }`;
        }
        this.semicolonLine(`import ${name} from '${moduleName}'`);

        return this;
    }

    public component(metadata: {
        selector: string,
        template: string
    }): AngularBuffer {
        this
            .appendLine('@Component({')
            .indent().commaLine(`selector: ${metadata.selector}`)
            .indent().append('template: `')
            .append(metadata.template)
            .indent().appendLine('`')
            .appendLine('})');

        return this;
    }

    public ngModule(metadata: {
        declarations: Array<string>,
        imports: Array<string>,
        exports: Array<string>
    }): AngularBuffer {
        this.appendLine('@NgModule({');

        const keyList = Object.keys(metadata);
        keyList.forEach((key, index) => {
            this
                .indent().appendLine(`${key}: [`)
                .appendList(metadata[key])
                .indent().append(']');

            if (index === keyList.length - 1) {
                this.line();
            } else {
                this.commaLine();
            }
        });
        this.appendLine('})');

        return this;
    }

    private appendList(moduleList): AngularBuffer {
        moduleList.forEach((moduleName, index) => {
            this.indent().indent().append(moduleName);
            if (index === moduleList.length - 1) {
                this.line();
            } else {
                this.commaLine();
            }
        });

        return this;
    }
}
