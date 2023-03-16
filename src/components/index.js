/*
 * @Description: 
 * @Autor: WJM
 * @Date: 2020-12-24 16:34:47
 * @LastEditors: WJM
 * @LastEditTime: 2021-01-18 16:11:07
 */
import Vue from "vue";
import sunDesigner from './formDesigner/index.vue'
import sunForm from './formDesigner/formShow.vue'
import sunManage from './formDesigner/manage.vue'

// import CardItem from "./Card/CardItem.vue";
// import CardGroup from "./Card/CardGroup.vue";
// import Alert from "./Alert/Alert.vue";

const Components = {
  sunDesigner,sunForm,sunManage
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});

export default { sunDesigner,sunForm,sunManage };