export const forCountEach = (list: Array<any> = [], pushData: (index) => any, count: number, defaultIndex: number = 0) => {
    for (let index = defaultIndex; index < count; index++) {
        list.push(pushData(index));
    }
    return list;
};
