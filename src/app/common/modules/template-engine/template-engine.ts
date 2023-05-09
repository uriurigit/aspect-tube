
import { isString } from 'lodash';

export const template = (str) => {
    return isString(str) ? str.replace(/\n/g, '<br>') : str;
};
