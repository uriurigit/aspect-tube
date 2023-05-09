import { isBoolean, isNumber, isString } from 'lodash';

const el = (value) => {
    if (isBoolean(value)) { return `${value}`; }
    if (isNumber(value)) { return `${value}`; }
    if (isString(value)) { return `'${value}'`; }
};
export default el;
