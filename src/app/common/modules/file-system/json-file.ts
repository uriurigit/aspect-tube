import * as jsonfile from 'jsonfile';

export default class JsonFile {
    public writeFile(path: string, data: any, options: Object): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            jsonfile.writeFile(path, data, options, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }
}
