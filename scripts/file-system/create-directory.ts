import FileSystem from '@common/modules/file-system/file-system';

const errorHandling = (error) => {
    if (-4075 === error.errno && 'EEXIST' === error.code) {
        console.log('already exists');
    }
};
const createDirectory = async (path) => {
    await new FileSystem().mkdir(path).catch(errorHandling);
};
export default createDirectory;
