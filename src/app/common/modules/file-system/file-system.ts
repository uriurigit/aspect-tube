const fs = require('fs');

export default class FileSystem {
    public access(path: string, mode: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            fs.access(path, mode, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    public mkdir(path: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            fs.mkdir(path, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    public writeFile(filename: string, data: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            fs.writeFile(filename, data, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }
}
