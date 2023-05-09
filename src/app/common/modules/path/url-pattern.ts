import { ExtensionConstants } from '../../constants/extension.constants';
import { zeroPadding } from '../utility/string-utility';

export enum NamingPattern {
    serial = 1,
    zeroPaddingTwoDigit,
    zeroPaddingThreeDigit,
    zeroPaddingFiveDigit,
}

export const namingFormat = (
    pattern: NamingPattern,
    fileNameOptions: {
        name: string | number,
        fileNamePattern: string,
        extension: ExtensionConstants,
    }
): string => {
    const formatFileName = () => {
        switch (pattern) {
            case NamingPattern.serial:                  return String(fileNameOptions.name);
            case NamingPattern.zeroPaddingTwoDigit:     return zeroPadding(fileNameOptions.name as number, 2);
            case NamingPattern.zeroPaddingThreeDigit:   return zeroPadding(fileNameOptions.name as number, 3);
            case NamingPattern.zeroPaddingFiveDigit:   return zeroPadding(fileNameOptions.name as number, 5);
            default: return '';
        }
    };

    return `${fileNameOptions.fileNamePattern.replace('{$page}', formatFileName())}.${fileNameOptions.extension.valueOf()}`;
};
