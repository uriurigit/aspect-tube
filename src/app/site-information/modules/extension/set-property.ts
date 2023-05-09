export default function setProperty(site) {
    return {
        ...site,
        getSelector: () => site.meta.component.selector,
        getRouteName: () => site.meta.route.routeName
    };
}
