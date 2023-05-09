import FileSystem from '@common/modules/file-system/file-system';
const fs = require('fs');

const isExistsFile = async (path) => {
    try {
        await new FileSystem().access(path, fs.constants.R_OK);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return false;
        }
    }

    return true;
};
export default isExistsFile;
