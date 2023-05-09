import { isArray, merge } from 'lodash';

export const superMerge = (original, other) => {
    return merge(original, other, (a, b) => {
        if (isArray(a) && isArray(b)) {
            return a.concat(b);
        }
    });
};
