// import CommonCodeEditor from './CommonCodeEditor'
// import CommonHttpSet from './CommonHttpSet'
// import CommonIconSetting from './CommonIconSetting'
// import CommonJsonListEdit from './CommonJsonListEdit'
// import CommonUpload from './CommonUpload'
// import configButton from './config-button'
// import configCheckbox from './config-checkbox'
// import configCodeEditor from './config-codeEditor'
// import configDatatable from './config-datatable'
// import configDatatableitem from './config-datatableitem'
// import configDate from './config-date'
// import configDaterange from './config-daterange'
// import configDivider from './config-divider'
// import configGrid from './config-grid'
// import configInput from './config-input'
// import configModal from './config-modal'
// import configRadio from './config-radio'
// import configSelect from './config-select'
// import configSelects from './config-selects'
// import configTextarea from './config-textarea'
// import configTime from './config-time'
// import configTitle from './config-title'
// import configFile from './config-file'
// import configTimerange from './config-timerange'
// import containerWrapper from './container-wrapper'
// import configSwitch from './config-switch'
// import configTabs from './config-tabs'
// import configService from './config-service'
// import designFormWrapper from './designFormWrapper'
// import formModeWrapper from './formModeWrapper'
// import sunForm from '../components/formDesigner/formShow.vue'
// import widgetButton from './widget-button'
// import widgetCheckbox from './widget-checkbox'
// import widgetCodeEditor from './widget-codeEditor'
// import widgetDatatable from './widget-datatable'
// import widgetDatatableitem from './widget-datatableitem'
// import widgetDate from './widget-date'
// import widgetDaterange from './widget-daterange'
// import widgetDivider from './widget-divider'
// import widgetGrid from './widget-grid'
// import widgetInput from './widget-input'
// import widgetModal from './widget-modal'
// import widgetRadio from './widget-radio'
// import widgetSelect from './widget-select'
// import widgetSelects from './widget-selects'
// import widgetTextarea from './widget-textarea'
// import widgetTime from './widget-time'
// import widgetTitle from './widget-title'
// import widgetTimerange from './widget-timerange'
// import widgetSwitch from './widget-switch'
// import widgetTabs from './widget-tabs'
// import widgetService from './widget-service'
// import widgetFile from './widget-file'

// var componentsContext = [
//     configFile, widgetFile,
//     configService, widgetService,
//     configTabs, widgetTabs,
//     configSwitch, widgetSwitch,
//     CommonCodeEditor,
//     CommonHttpSet,
//     CommonIconSetting,
//     CommonJsonListEdit,
//     CommonUpload,
//     configButton,
//     configCheckbox,
//     configCodeEditor,
//     configDatatable,
//     configDatatableitem,
//     configDate,
//     configDaterange,
//     configDivider,
//     configGrid,
//     configInput,
//     configModal,
//     configRadio,
//     configSelect,
//     configSelects,
//     configTextarea,
//     configTime,
//     configTitle,
//     configTimerange,
//     containerWrapper,
//     designFormWrapper,
//     formModeWrapper,
//     sunForm,
//     widgetButton,
//     widgetCheckbox,
//     widgetCodeEditor,
//     widgetDatatable,
//     widgetDatatableitem,
//     widgetDate,
//     widgetDaterange,
//     widgetDivider,
//     widgetGrid,
//     widgetInput,
//     widgetModal,
//     widgetRadio,
//     widgetSelect,
//     widgetSelects,
//     widgetTextarea,
//     widgetTime,
//     widgetTimerange,
//     widgetTitle
// ]

// export default {
//     install(Vue, options) {
//         componentsContext.forEach(component => {
//             Vue.component(component.name, component)
//         })
//     }
// };

import sunForm from '../components/formDesigner/formShow.vue'
const componentsContext = require.context('./', true, /index.(vue|js)$/)
export default{
    install(Vue, options) {
        componentsContext.keys().map(fileName => {
            let comp = componentsContext(fileName).default;
            Vue.component(comp.name, comp)
        })
        Vue.component(sunForm.name, sunForm)
    }
}