export class FullToHalfWidthReplacer {
    public static replace(str: string): string {
        str = FullToHalfWidthReplacer.replaceWhiteSpace(str);
        str = FullToHalfWidthReplacer.replaceNumber(str);
        str = FullToHalfWidthReplacer.replaceWord(str);

        return str;
    }

    public static replaceWhiteSpace(str: string): string {
        return str.replace(/　/g, ' ');
    }

    public static replaceNumber(str: string): string {
        return str.replace(/[０-９]/g, this.fullToHalfWidth);
    }

    public static replaceWord(str: string): string {
        return str.replace(/[Ａ-Ｚａ-ｚ]/g, this.fullToHalfWidth);
    }

    public static fullToHalfWidth(str: string): string {
        return String.fromCharCode(str.charCodeAt(0) - 65248);
    }
}

export const join = (list: Array<any>, each: (arg) => {}, separator: string = ''): string => {
    return list.map(each).join(separator);
};

// 同じ文字を繰り返す
export const repeatTheSameString = (str: string, count: number): string => {
    return Array.apply(null, Array(count)).map(() => str).join('');
};

// ゼロ埋めする
export const zeroPadding = (num: number, size: number): string => {
    return (repeatTheSameString('0', size) + num).slice( -1 * size );
};

export const splitByWhiteSpace = (str: string): Array<string> => {
    return FullToHalfWidthReplacer.replaceWhiteSpace(str).split(' ');
};
