export default class Constitution {
    public static get material() {
        return 'material';
    }
    public static get scripts() {
        return 'scripts';
    }
    public static get src() {
        return 'src';
    }
    public static get app() {
        return 'app';
    }
    public static get appCollection() {
        return {
            appKit: 'app-kit',
            authorize: 'authorize',
            common: 'common',
            debug: 'debug',
            error: 'error',
            outside: 'outside',
            site: 'site',
            siteInformation: 'site-information'
        };
    }
    public static get environments() {
        return 'environments';
    }
    public static get siteCollection() {
        return {
            components: 'components',
            data: 'data',
            modules: 'modules',
            route: 'route'
        };
    }
    public static get routeList() {
        return 'route-list.ts';
    }
    public static get moduleList() {
        return 'module-list.ts';
    }
    public static get assets() {
        return 'assets';
    }
    public static get assetsCollection() {
        return {
            common: 'common',
            site: 'site'
        };
    }
    public static get angularCliConfig() {
        return '.angular-cli.json';
    }
    public static get packageConfig() {
        return 'package.json';
    }
    public static get tsconfig() {
        return 'tsconfig.json';
    }
    public static get tslint() {
        return 'tslint.json';
    }
    public static get favicon() {
        return 'favicon.ico';
    }
}
