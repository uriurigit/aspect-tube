import { cloneDeep } from 'lodash';

export default class MapBuffer {
    private buffer: Array<any> = [];
    private cursor = 0;

    public appendCell(cell: any): MapBuffer {
        this.createRow();
        this.buffer[this.cursor].push(cell);

        return this;
    }

    public appendCellList(cellList: Array<any>): MapBuffer {
        cellList.forEach((cell) => {
            this.appendCell(cell);
        });

        return this;
    }

    public appendLine(cell: any): MapBuffer {
        this.appendCell(cell);
        this.cursor++;

        return this;
    }

    public appendRow(array: Array<any>): MapBuffer {
        this.createRow();
        this.cursor++;
        this.createRow();
        this.buffer[this.cursor] = array;
        this.cursor++;

        return this;
    }

    public merge(array: Array<any>): MapBuffer {
        this.buffer.concat(array);
        this.cursor = this.buffer.length - 1;

        return this;
    }

    public toArray(): Array<any> {
        return cloneDeep(this.buffer);
    }

    private createRow(): void {
        if (this.cursor > this.buffer.length - 1) {
            this.buffer.push([]);
        }
    }
}
