import { isEmpty } from 'lodash';

export const createPath = (...args) => {
    return args.filter((arg) => !isEmpty(arg)).join('/');
};
export const path = (...args) => {
    return args.filter((arg) => !isEmpty(arg)).join('/');
};
