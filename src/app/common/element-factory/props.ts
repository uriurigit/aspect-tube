import el from './el';
import { join } from '../modules/utility/string-utility';

export const deploy = (obj = {}) => {
    return join(
        Object.keys(obj),
        (key) => `${key}=${el(obj[key])}`,
        ' '
    );
};
