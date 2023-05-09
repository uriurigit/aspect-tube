import JsonFile from '@common/modules/file-system/json-file';
import RuleInformation from '@material/rule-information';

const writeJson = async (filePath, jsonData) => {
    await new JsonFile().writeFile(filePath, jsonData, {
        encoding: RuleInformation.charset,
        replacer: null,
        spaces: RuleInformation.indent.size
    });
}
export default writeJson;
