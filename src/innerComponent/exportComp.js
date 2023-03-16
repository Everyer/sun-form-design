let config = {};
let common = {};
let widget = {};

const componentsContext = require.context('./', true, /index.(vue|js)$/)
componentsContext.keys().map(fileName => {
    let comp = componentsContext(fileName).default;
    if (comp.name.includes('config-')) {
        config[comp.name] = comp
    } else if (comp.name.includes('widget-')) {
        widget[comp.name] = comp
    } else {
        common[comp.name] = comp
    }
})
export {
    config,
    common,
    widget
}