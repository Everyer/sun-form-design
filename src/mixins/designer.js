import widgetConfig from "./widgetConfig";
import httpHandle from '../api/http'
import remark from './remark'
export function createDesigner(vueInstance, widgetList, headers = {}, theme, parentApp, baseUrl, httpSuccessHandle, httpErrorHandle, httpBeforeSendHandle, params, parentVueInstance) {
    var that = vueInstance;
    return {
        $http: httpHandle(headers, baseUrl, httpSuccessHandle, httpErrorHandle, httpBeforeSendHandle), //http请求
        $message: that.$message, //消息提示
        $confirm: that.$confirm,
        $utils: that.$utils,
        baseUrl: baseUrl,
        widgetList: widgetList ? widgetList : [],
        formMode: !!widgetList,
        chosenWidget: null,
        widgetVueInstance: {},
        tmpData: params ? params : {},
        headers: headers,
        theme: theme,
        remark: remark,
        parentApp: parentApp,
        smallScreen: window.innerWidth < 768,
        eventToParent(val) {
            that.$emit('eventToParent', val);
        },
        getQueryString() {
            return that.$route.query;
        },
        getParentVueInstance() {
            return parentVueInstance;
        },
        getParentApp() {
            return this.parentApp;
        },
        getDetailByList(val, list) {
            if (!list.length) {
                return ''
            }
            var result = ''
            if (val instanceof Array) {
                val.forEach(item => {
                    list.forEach(item2 => {
                        if (item2.value === item) {
                            result += item2.label + ','
                        }
                    })
                })
                result = result.substring(0, result.length - 1)
            } else {
                list.forEach(item => {
                    if (item.value === val) {
                        result = item.label
                    }
                })
            }
            return result
        },
        formatTreeList() {
            var list = that.$utils.clone(this.widgetList, true)
            var formatTableList = function (item) {
                item.widgetList = item.props.tableConfig.buttonList.concat(item.props.tableConfig.queryList.concat(item.props.tableConfig.tableList))

                item.widgetList.forEach(item2 => {
                    if (item2.type == 'datatable') {
                        formatTableList(item2);
                    }
                })
            }
            var format = function (widgetList) {
                widgetList.forEach(item => {
                    if (item.type == 'tabs') {
                        // item.props.tabs.forEach(tab => {
                        //     tab.widgetList.forEach(item2 => {
                        //         item.widgetList.push(item2);
                        //     })
                        // })
                    } else if (item.type == 'datatable') {
                        formatTableList(item)
                    } else {
                        if (item.widgetList && item.widgetList.length) {
                            format(item.widgetList);
                        }
                    }
                });
            }
            format(list);
            list.unshift({
                displayName: "",
                type: "app",
                id: "",
                props: {
                    label: "全局方法"
                }
            })
            return list;
        },
        formatStyle(item) {
            if (!item.type || item.type !== 'div') {
                return {
                    width: 4.16667 * item.props.width + '%'
                };
            } else {
                var style = {};
                var arr = item.props.style;
                if (item.props.divWidth) {
                    style.width = item.props.divWidth;
                }
                if (item.props.divHeight) {
                    style.height = item.props.divHeight;
                }
                if (arr && arr.length > 0) {
                    arr.forEach(item => {
                        style[item.label] = item.value;
                    })
                }
                return style;
            }
        },
        clearAllActive(widgetList) {
            if (!widgetList) {
                widgetList = this.widgetList;
            }
            widgetList.forEach(item => {
                that.$set(item, "active", false);
                if (item.type == 'tabs') {
                    var tmpTabArr = []
                    item.props.tabs.forEach(tab => {
                        tab.widgetList.forEach(item2 => {
                            tmpTabArr.push(item2)
                            // that.$set(item2, "active", false);
                            // if (item2.widgetList && item2.widgetList.length) {
                            //     this.clearAllActive(item2.widgetList);
                            // }
                        })
                    })
                    this.clearAllActive(tmpTabArr)
                }
                if (item.widgetList && item.widgetList.length) {
                    this.clearAllActive(item.widgetList);
                }
            });
        },
        eventHandle(value, type, widget, self) {
            if (!this.formMode) {
                return
            }
            if (type == 'onCreated') {
                this.widgetVueInstance[widget.id] = self;
            }
            var app = this;
            if (widget.props[type]) {
                var tableObj = value
            }
            var func = new Function('value', 'type', 'widget', 'self', 'app', widget.props[type]);
            func(value, type, widget, self, app);
        },
        getParam(key) {
            return this.tmpData[key];
        },
        setParam(key, value) {
            this.tmpData[key] = value
        },
        getWidget(id) {
            return this.widgetVueInstance[id];
        },
        resetForm(id, widgetList) {
            if (!widgetList) {
                var findWidgetListById = function (widgetList, status) {
                    for (var i = 0; i < widgetList.length; i++) {
                        var item = widgetList[i];
                        if (item.id == id) {
                            return item.widgetList;
                        }
                        if (item.widgetList && item.widgetList.length) {
                            findWidgetListById(item.widgetList);
                        }

                    }
                }
                var arr = findWidgetListById(this.widgetList);
            }

            var resetForm = function (widgetList) {
                for (var i = 0; i < widgetList.length; i++) {
                    var item = widgetList[i];
                    if (item.isForm) {
                        item.props.value = item.props.defaultValue;
                    }
                    if (item.widgetList && item.widgetList.length) {
                        resetForm(item.widgetList);
                    }
                }
            }
            if (widgetList) {
                resetForm(widgetList);
            } else {
                resetForm(arr);
            }
        },
        getProps(id) {
            var formatTableList = function (item, id) {
                var widgetList = item.props.tableConfig.buttonList.concat(item.props.tableConfig.queryList.concat(item.props.tableConfig.tableList))
                var result = null
                widgetList.forEach(item2 => {
                    if (item2.id === id) {
                        result = item2
                    }
                    if (item2.type == 'datatable') {
                        formatTableList(item2, id);
                    }
                })
                return result
            }
            var find = function (widgetList) {
                for (var i = 0; i < widgetList.length; i++) {
                    var item = widgetList[i];
                    if (item.id == id) {
                        return item;
                    }
                    if (item.type == 'datatable') {
                        if (formatTableList(item, id)) {
                            return formatTableList(item, id)
                        }
                    }
                    if (item.type == 'tabs') {
                        var tmpTabArr = []
                        var result=null;
                        item.props.tabs.forEach(tab => {
                            tab.widgetList.forEach(item2 => {
                                tmpTabArr.push(item2)
                                if (item2.id === id) {
                                    result = item2
                                }
                            })
                        })
                        if (result) {
                            return result
                        }else{
                            return find(tmpTabArr)
                        }
                        // find(tmpTabArr)
                    }
                    if (item.widgetList && item.widgetList.length) {
                        var form = find(item.widgetList);
                        if (form) {
                            return form;
                        }
                    }
                }
            }
            return find(this.widgetList);
        },
        setFormType(id, type) {
            var props = this.getProps(id).props;
            if (props) {
                that.$set(props, 'formType', type)
            }
        },
        setHide(id, type) {
            var props = this.getProps(id).props;
            if (props) {
                that.$set(props, 'hide', type)
            }
        },
        setRequired(id, type) {
            var props = this.getProps(id).props;
            if (props) {
                that.$set(props, 'required', type)
            }
        },
        setValue(id, value) {
            var props = this.getProps(id).props;
            if (props) {
                that.$set(props, 'value', value)
            }
        },
        getValue(id) {
            var props = this.getProps(id).props;
            if (props) {
                return props.value;
            }
        },
        formatWidget(data) {
            var data = that.$utils.clone(data, true);
            data.id = data.type + "-" + Math.floor(new Date().getTime() % 10000000);
            var w = widgetConfig[data.type];
            w.props.id = data.id;
            w.props.label = data.displayName;
            w.props.roleData = "";
            data.props = {
                ...w.props
            }
            if (data.type == "datatable") {
                data.props.tableConfig.buttonList = []
                data.props.tableConfig.queryList = []
                data.props.tableConfig.tableList = []
            }
            if ('select|selects|radio|checkbox'.includes(data.type)) {
                data.props.apiSet = that.$utils.clone({
                    method: "get",
                    apiurl: "",
                    params: [],
                    contentType: "JSON",
                    dataFormat: "",
                    labelField: "",
                    valueField: "",
                }, true);
            }
            if (data.type == "tabs") {
                data.props.tabs = [{
                    label: "标签页1",
                    value: "tab1",
                    widgetList: []
                }, {
                    label: "标签页2",
                    value: "tab2",
                    widgetList: []
                }, {
                    label: "标签页3",
                    value: "tab3",
                    widgetList: []
                }]
            }
            var obj = {
                ...w,
                ...data
            }
            return obj
        },
        returnChosen() {
            var d = this.widgetList;
            var find = function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].active) {
                        return data[i];
                    } else if (data[i].type == 'tabs') {
                        var obj = null;
                        var tmpTabArr = []
                        data[i].props.tabs.forEach(tab => {
                            tab.widgetList.forEach(item => {
                                tmpTabArr.push(item)
                                // if (item.active) {
                                //     obj = item
                                // }
                                // if (item.widgetList && item.widgetList.length) {
                                //     var r = find(item.widgetList);
                                //     if (r) {
                                //         obj = r;
                                //     }
                                // }
                            })
                        })
                        obj = find(tmpTabArr)
                        if (obj) {
                            return obj
                        }
                    } else {
                        if (data[i].widgetList && data[i].widgetList.length) {
                            var r = find(data[i].widgetList);
                            if (r) {
                                return r;
                            }
                        }
                    }
                }
            }
            var result = find(d);
            if (!result && this.chosenWidget) {
                result = this.chosenWidget;
            }
            this.chosenWidget = result;
        }
    }
}