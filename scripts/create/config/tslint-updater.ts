import Constitution from '@material/constitution';
import ProjectInformation from '@material/project-information';
import RuleInformation from '@material/rule-information';
import writeJson from '../../file-system/write-json';

const {
    tslint
} = Constitution;

export default class TslintUpdater {
    public async update() {
        const jsonData = await import(`../../../${tslint}`);

        await writeJson(`./${tslint}`, jsonData);
    }

    private updateRules(jsonData) {
        const { rules } = jsonData;

        rules.indent = [
            true,
            RuleInformation.indent.tsLintStyle,
            RuleInformation.indent.size
        ];
    }
}
