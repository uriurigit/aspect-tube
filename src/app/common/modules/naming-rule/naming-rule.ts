export const kebabToLowerCamel = (scStr) => {
    return scStr.replace(/-./g, (str) => str.charAt(1).toUpperCase());
};
export const lowerCamelToUpperCamel = (lccStr) => {
    return lccStr.replace(/^[a-z]/g, (str) => str.toUpperCase());
};
export const kebabToUpperCamel = (scStr) => {
    return lowerCamelToUpperCamel(kebabToLowerCamel(scStr));
};
export const lowerCamelToKebab = (scStr) => {
    return scStr.replace(/([A-Z])/g, (str) => '-' + str.charAt(0).toLowerCase());
};
