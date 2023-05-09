export function getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const columnList = query.split('&');
    let value = '';
    columnList.forEach((column) => {
        const pair = column.split('=');
        if (pair[0] === variable) {
            value = pair[1];
        }
    });

    return value;
}
