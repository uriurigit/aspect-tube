import RuleInformation from '@material/rule-information';

export default class StringBuffer {
    private buffer = '';

    public append(str: string = ''): StringBuffer {
        this.buffer += str;

        return this;
    }

    public line(str: string = ''): StringBuffer {
        return this.append(RuleInformation.newLine);
    }

    public appendLine(str: string = ''): StringBuffer {
        return this.append(str).line();
    }

    public indent(): StringBuffer {
        return this.append(RuleInformation.indent.material);
    }

    public commaLine(str: string = ''): StringBuffer {
        return this.append(str).appendLine(',');
    }

    public semicolonLine(str: string = ''): StringBuffer {
        return this.append(str).appendLine(';');
    }

    public toString(): string {
        return this.buffer;
    }

    public get string() {
        return this.toString();
    }
}
