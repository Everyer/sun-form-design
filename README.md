# 欢迎使用sun-form-design
**sun-form-design**是一款专为为前后端开发的低代码开发组件，可以集成到您的vue2项目中。特点描述：
- **功能丰富** ：常用开发组件都已经封装如其中，后续维护还在补充更多插件。
- **用法简单** ：简洁高效的编辑方式，所有APi无需查看接口，选中生成方法。
- **开发思维** ：编程方式符合大部分程序员编程方式。
- **二次开发** ：设计方式是基于组件开发，便捷高效适合二次开发。
## 示例地址
> http://res.jzyglxt.com/app/sun_form/index.html
## 使用方式
由于sun-form-design使用了element-ui和vxe-table因此相关依赖需要先下载
> npm i element-ui

> npm i xe-utils vxe-table@legacy

> npm install sun-form-design@latest
## 快速开始
main.js中代码如下：
``` javascript
import Vue from 'vue'
import App from './App.vue'

import sunForm from "sun-form-design";
import "sun-form-design/dist/sunForm.css"
Vue.use(sunForm);
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import XEUtils from "xe-utils";
Vue.prototype.$utils = XEUtils;
Vue.use(VXETable)
new Vue({
  render: h => h(App)
}).$mount('#app')
```
## 关于组件
> 共暴露出了三个组件
> - **sunDesigner** ：表单设计器。
> ![Alt text](http://res.jzyglxt.com/app/pics/1.png)

> - **sunForm** ：表单解析器。
> ![Alt text](http://res.jzyglxt.com/app/pics/2.png)
> ![Alt text](http://res.jzyglxt.com/app/pics/4.png)
> - **sunManage** ：表单管理器。
> ![Alt text](http://res.jzyglxt.com/app/pics/3.png)
## 组件使用方式
> ``` html
> <sun-designer :headers="{token:'xxx'}"></sun-designer>
> <sun-form :headers="{token:'xxx'}"></sun-form>
> <sun-manage :apiSet="apiSet"></sun-manage>
> ```
> apiset配置代码
> ``` javascript
>    {
>        baseUrl:'/jcbg',
>        headers: {
>          "token":`xxx`,
>        },
>        configDataKey: "configContent",
>        configNameKey: "remark",
>        configCodeKey: "code",
>        configIdKey: "id",
>        apiSetList: {
>          method: "post",
>          apiurl: "/webPage/listWebPageConfig",
>          params: [],
>          contentType: "JSON",
>          dataFormat: "",
>          baseInfo: {
>            rows: "datas",
>            count: "total",
>            page: "pageindex",
>            limit: "pagesize",
>            pageDefault: "20"
>          }
>        },
>        apiSetCreate: {
>          method: "post",
>          apiurl: "/webPage/addWebPageConfig",
>          params: [],
>          contentType: "JSON",
>          dataFormat: ""
>        },
>        apiSetUpdate: {
>          method: "post",
>          apiurl: "/webPage/editWebPageConfig",
>          params: [],
>          contentType: "JSON",
>          dataFormat: ""
>        },
>        apiSetDelete: {
>          method: "post",
>          apiurl: "/webPage/deleteWebPageConfig",
>          params: [],
>          contentType: "JSON",
>          dataFormat: ""
>        },
>        apiSetDetail: {
>          method: "post",
>          apiurl: "/webPage/getWebPageConfig",
>          params: [],
>          contentType: "JSON",
>          dataFormat: ""
>        }
>      }
> ```
## 后续开发计划(等我有空/(ㄒoㄒ)/~~)
>- 增加常用模板开发
>- 表单表格根据接口Schema自动生成排版，减少配置人员工作
>- 新增更多UI类组件，让页面更美观如：统计组件，步骤条组件，流程组件等
>- 性能优化
>- 具体使用文档以及二次开发文档
## 沟通交流
>开源代码随后会放地址，如有定制化需求或者学习交流或者功能建议可联系qq：1297425135 或者微信：lllIIIllllIIIlllIII
## 开源项目地址
> https://github.com/Everyer/sun-form-design
