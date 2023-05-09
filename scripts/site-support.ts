import AngularCliConfigUpdater from './create/config/angular-cli-config-updater';
import PackageUpdater from './create/config/package-updater';
import TsConfigUpdater from './create/config/ts-config-updater';
import TslintUpdater from './create/config/tslint-updater';
import AppResourceCreator from './create/resource/app-resource-creator';
import AssetsResourceCreator from './create/resource/assets-resource-creator';

const start = async () => {
    await executeFramework('angular-cli', async () => {await new AngularCliConfigUpdater().update()});
    await executeFramework('package', async () => {await new PackageUpdater().update()});
    await executeFramework('tsconfig', async () => {await new TsConfigUpdater().update()});
    await executeFramework('tslint', async () => {await new TslintUpdater().update()});
    await executeFramework('app resource', async () => {await new AppResourceCreator().create()});
    await executeFramework('assets resource', async () => {await new AssetsResourceCreator().create()});
}

async function executeFramework(configName, execute) {
    try {
        console.log(`create ${configName} [START]`);
        await execute();
        console.log(`create ${configName} : success`);
    } catch (error) {
        console.log(`create ${configName} : error`);
        console.log(error);
    } finally {
        console.log(`create ${configName} [END]`);
    }
}

start().then(() => {}).catch(() => {});
