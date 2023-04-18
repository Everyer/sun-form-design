export default {
    grid: {
        isContainer: true,
        displayName: "表单",
        hasLabel: false,
        isForm: false,
        canAddDataTableQuery: false,
        canAddDataTableList: false,
        widgetList: [],
        props: {
            label: "",
            width: 24,
            formType: "Create", //表单类型 Create,Update,Detail
            apiSetCreate: {
                method: "get",
                apiurl: "",
                params: [],
                contentType: "JSON",
                dataFormat: "",
            },
            apiSetUpdate: {
                method: "get",
                apiurl: "",
                params: [],
                contentType: "JSON",
                dataFormat: "",
            },
            apiSetDetail: {
                method: "get",
                apiurl: "",
                params: [],
                contentType: "JSON",
                dataFormat: "",
            },
            onCreated: null,
            onMounted: null,
        }
    },
    modal: {
        isContainer: true,
        displayName: "弹窗",
        hasLabel: false,
        isForm: false,
        widgetList: [],
        canAddDataTableQuery: false,
        canAddDataTableList: false,
        props: {
            title: "弹窗",
            show: false,
            modalWidth: "80%",
            modalHeight: "80%",
            label: "",
            hasFooter: true,

            onCreated: null,
            onMounted: null,
            onHide: null,
            onShow: null,
            onConfirm: null,
        }
    },
    tabs: {
        isContainer: true,
        displayName: "标签页",
        hasLabel: false,
        isForm: false,
        canAddDataTableQuery: false,
        canAddDataTableList: false,
        widgetList: [],
        props: {
            label: "标签页",
            width: 24,
            type: "border-card",
            activeName: null,
            loadType: "loadOnce",
            tabs: [{
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
            }],
            onCreated: null,
            onMounted: null,
            onChange: null,
        }
    },
    input: {
        isContainer: false,
        displayName: "输入框",
        hasLabel: true,
        isForm: true,
        canAddDataTableQuery: true,
        canAddDataTableList: true,
        props: {
            size: "medium",
            required: false,
            readonly: false,
            disabled: false,
            isDetail: false,
            hide: false,
            placeholder: "请输入",
            labelPosition: "left",
            value: null,
            zdname: null,
            label: "",
            labelAlign: "right",
            labelWidth: "120px",
            width: 24,
            type: "text",

            onCreated: null,
            onMounted: null,
            onInput: null,
            onChange: null,
            onFocus: null,
            onBlur: null,
            onHandle: null,
        }
    },
    select: {
        isContainer: false,
        displayName: "下拉框",
        hasLabel: true,
        isForm: true,
        canAddDataTableQuery: true,
        canAddDataTableList: true,
        props: {
            size: "medium",
            required: false,
            disabled: false,
            hide: false,
            labelPosition: "left",
            placeholder: "请选择",
            value: null,
            zdname: null,
            label: "",
            isDetail: false,
            labelAlign: "right",
            labelWidth: "120px",
            width: 24,
            apiSet: {
                method: "get",
                apiurl: "",
                params: [],
                contentType: "JSON",
                dataFormat: "",
                labelField: "",
                valueField: "",
            },
            list: [{
                    label: "选项1",
                    value: "1"
                },
                {
                    label: "选项2",
                    value: "2"
                },
                {
                    label: "选项3",
                    value: "3"
                }
            ],
            onCreated: null,
            onMounted: null,
            onChange: null,
            onFocus: null,
            onBlur: null,
        }
    },
    selects: {
        isContainer: false,
        displayName: "下拉多选框",
        hasLabel: true,
        isForm: true,
        canAddDataTableQuery: true,
        canAddDataTableList: true,
        props: {
            size: "medium",
            required: false,
            disabled: false,
            hide: false,
            labelPosition: "left",
            placeholder: "请选择",
            value: null,
            isDetail: false,
            multipleLimit: 0,
            collapseTags: false,
            zdname: null,
            label: "",
            labelAlign: "right",
            labelWidth: "120px",
            width: 24,
            apiSet: {
                method: "get",
                apiurl: "",
                params: [],
                contentType: "JSON",
                dataFormat: "",
                labelField: "",
                valueField: "",
            },
            list: [{
                    label: "选项1",
                    value: "1"
                },
                {
                    label: "选项2",
                    value: "2"
                },
                {
                    label: "选项3",
                    value: "3"
                }
            ],
            onCreated: null,
            onMounted: null,
            onChange: null,
            onFocus: null,
            onBlur: null,
        }
    },
    radio: {
        isContainer: false,
        displayName: "单选框",
        hasLabel: true,
        isForm: true,
        canAddDataTableQuery: true,
        canAddDataTableList: true,
        props: {
            required: false,
            disabled: false,
            hide: false,
            labelPosition: "left",
            isButton: false,
            isDetail: false,
            isBlock: false,
            value: null,
            zdname: null,
            label: "",
            labelAlign: "right",
            labelWidth: "120px",
            width: 24,
            apiSet: {
                method: "get",
                apiurl: "",
                params: [],
                contentType: "JSON",
                dataFormat: "",
                labelField: "",
                valueField: "",
            },
            list: [{
                    label: "选项1",
                    value: "1"
                },
                {
                    label: "选项2",
                    value: "2"
                },
                {
                    label: "选项3",
                    value: "3"
                }
            ],
            onCreated: null,
            onMounted: null,
            onChange: null,
        }
    },
    checkbox: {
        isContainer: false,
        displayName: "多选框",
        hasLabel: true,
        isForm: true,
        canAddDataTableQuery: true,
        canAddDataTableList: true,
        props: {
            size: "medium",
            required: false,
            disabled: false,
            hide: false,
            isDetail: false,
            labelPosition: "left",
            isButton: false,
            isBlock: false,
            value: "",
            zdname: null,
            label: "",
            labelAlign: "right",
            labelWidth: "120px",
            width: 24,
            apiSet: {
                method: "get",
                apiurl: "",
                params: [],
                contentType: "JSON",
                dataFormat: "",
                labelField: "",
                valueField: "",
            },
            list: [{
                    label: "选项1",
                    value: "1"
                },
                {
                    label: "选项2",
                    value: "2"
                },
                {
                    label: "选项3",
                    value: "3"
                }
            ],
            onCreated: null,
            onMounted: null,
            onChange: null,
        }
    },
    date: {
        isContainer: false,
        hasLabel: true,
        displayName: "日期",
        isForm: true,
        canAddDataTableQuery: true,
        canAddDataTableList: true,
        props: {
            size: "medium",
            required: false,
            disabled: false,
            hide: false,
            labelPosition: "left",
            placeholder: "请选择",
            isDetail: false,
            value: null,
            type: "date",
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
            defaultNow: false,
            zdname: null,
            label: "",
            labelAlign: "right",
            labelWidth: "120px",
            width: 24,

            onCreated: null,
            onMounted: null,
            onChange: null,
            onFocus: null,
            onBlur: null,
        }
    },
    textarea: {
        isContainer: false,
        displayName: "文本域",
        hasLabel: true,
        isForm: true,
        canAddDataTableQuery: false,
        canAddDataTableList: true,
        props: {
            size: "medium",
            required: false,
            readonly: false,
            disabled: false,
            hide: false,
            isDetail: false,
            placeholder: "请输入",
            labelPosition: "left",
            rows: 3,
            value: null,
            zdname: null,
            label: "",
            labelAlign: "right",
            labelWidth: "120px",
            width: 24,

            onCreated: null,
            onMounted: null,
            onInput: null,
            onChange: null,
            onFocus: null,
            onBlur: null,
        }
    },
    switch: {
        isContainer: false,
        displayName: "开关",
        hasLabel: true,
        isForm: true,
        canAddDataTableQuery: true,
        canAddDataTableList: true,
        props: {
            required: false,
            isDetail: false,
            disabled: false,
            hide: false,
            labelPosition: "left",
            value: false,
            zdname: null,
            label: "",
            labelAlign: "right",
            labelWidth: "120px",
            activeText: "开",
            inactiveText: "关",

            onCreated: null,
            onMounted: null,
            onChange: null,
        }
    },
    daterange: {
        isContainer: false,
        displayName: "日期区间",
        hasLabel: true,
        isForm: true,
        canAddDataTableQuery: true,
        canAddDataTableList: true,
        props: {
            size: "medium",
            required: false,
            disabled: false,
            hide: false,
            labelPosition: "left",
            placeholder: "请选择",
            value: null,
            isDetail: false,
            type: "daterange",
            rangeSeparator: " / ",
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
            zdname: null,
            label: "",
            labelAlign: "right",
            labelWidth: "120px",
            width: 24,

            onCreated: null,
            onMounted: null,
            onChange: null,
            onFocus: null,
            onBlur: null,
        }
    },
    time: {
        isContainer: false,
        hasLabel: true,
        displayName: "时间",
        isForm: true,
        canAddDataTableQuery: true,
        canAddDataTableList: true,
        props: {
            size: "medium",
            required: false,
            disabled: false,
            hide: false,
            labelPosition: "left",
            isDetail: false,
            placeholder: "请选择",
            value: null,
            format: "HH:mm:ss",
            valueFormat: "HH:mm:ss",
            zdname: null,
            label: "",
            labelAlign: "right",
            labelWidth: "120px",
            width: 24,

            onCreated: null,
            onMounted: null,
            onChange: null,
            onFocus: null,
            onBlur: null,
        }
    },
    timerange: {
        isContainer: false,
        displayName: "时间区间",
        hasLabel: true,
        isForm: true,
        canAddDataTableQuery: true,
        canAddDataTableList: true,
        props: {
            size: "medium",
            required: false,
            disabled: false,
            hide: false,
            labelPosition: "left",
            placeholder: "请选择",
            value: null,
            rangeSeparator: " / ",
            isDetail: false,
            format: "HH:mm:ss",
            valueFormat: "HH:mm:ss",
            zdname: null,
            label: "",
            labelAlign: "right",
            labelWidth: "120px",
            width: 24,

            onCreated: null,
            onMounted: null,
            onChange: null,
            onFocus: null,
            onBlur: null,
        }
    },
    rate: {
        isContainer: false,
        displayName: "评分",
        hasLabel: true,
        isForm: true,
        canAddDataTableQuery: true,
        canAddDataTableList: true,
        props: {
            required: false,
            disabled: false,
            isDetail: false,
            hide: false,
            labelPosition: "left",
            value: 5,
            zdname: null,
            label: "",
            labelAlign: "right",
            labelWidth: "120px",
            width: 24,
            max: 5,
            allowHalf: false,
            showScore: false,


            onCreated: null,
            onMounted: null,
            onChange: null,
        }
    },
    file: {
        isContainer: false,
        displayName: "文件上传",
        hasLabel: false,
        isForm: true,
        canAddDataTableQuery: false,
        canAddDataTableList: true,
        widgetList: [],
        props: {
            size: "medium",
            required: false,
            disabled: false,
            isDetail: false,
            hide: false,
            placeholder: "请上传文件",
            labelPosition: "left",
            value: null,
            zdname: null,
            label: "",
            labelAlign: "right",
            labelWidth: "120px",
            width: 24,
            fileField: "file", //文件上传字段
            fileIdField: "id", //文件ID字段
            fileNameField: "fileName", //文件名称字段
            fileUrlField: "", //文件URL字段
            fileSaveType: 'name,id',
            fileDownType: 'blob', //文件下载方式
            fileGetUrl: "", //文件获取地址
            accept: "", //文件后缀类型，逗号隔开
            limit: 100, //限制文件个数
            readonly: false, //是否只能查看
            multiple: true, //是否支持多个上传
            apiSet: {
                method: "post",
                apiurl: "",
                params: [],
                contentType: "FormData",
                dataFormat: "",
            },
            onCreated: null,
            onMounted: null,
        }
    },
    location: {
        isContainer: false,
        displayName: "位置选择器",
        hasLabel: true,
        isForm: true,
        canAddDataTableQuery: true,
        canAddDataTableList: true,
        props: {
            size: "medium",
            required: false,
            readonly: false,
            disabled: false,
            isDetail: false,
            hide: false,
            labelPosition: "left",
            value: null,
            zdname: null,
            label: "",
            labelAlign: "right",
            labelWidth: "120px",
            width: 24,

            onCreated: null,
            onMounted: null,
            onInput: null,
            onChange: null,
            onFocus: null,
            onBlur: null,
            onHandle: null,
        }
    },
    service: {
        isContainer: false,
        displayName: "服务",
        hasLabel: false,
        isForm: false,
        canAddDataTableQuery: false,
        canAddDataTableList: false,
        widgetList: [],
        props: {
            label: "",
            width: 24,
            serviceJson: ``,
            apiSet: {
                method: "get",
                apiurl: "",
                params: [],
                contentType: "JSON",
                dataFormat: "",
            },
            onCreated: null,
            onMounted: null,
        }
    },
    iframe: {
        isContainer: false,
        displayName: "iframe",
        hasLabel: false,
        isForm: false,
        canAddDataTableQuery: false,
        canAddDataTableList: false,
        widgetList: [],
        props: {
            label: "iframe",
            width: 24,
            height: '50vh',
            src: "",
            onCreated: null,
            onMounted: null,
        }
    },
    editor: {
        isContainer: false,
        displayName: "富文本编辑器",
        hasLabel: true,
        isForm: true,
        canAddDataTableQuery: true,
        canAddDataTableList: true,
        props: {
            required: false,
            readonly: false,
            isDetail: false,
            hide: false,
            labelPosition: "left",
            value: null,
            zdname: null,
            label: "",
            labelAlign: "right",
            labelWidth: "120px",
            width: 24,
            fileField: "file", //文件上传字段
            fileUrlField: "", //文件URL字段
            apiSet: {
                method: "post",
                apiurl: "",
                params: [],
                contentType: "FormData",
                dataFormat: "",
            },
            onCreated: null,
            onMounted: null,
            onChange: null,
        }
    },
    codeEditor: {
        isContainer: false,
        displayName: "代码编辑器",
        hasLabel: true,
        isForm: true,
        canAddDataTableQuery: false,
        canAddDataTableList: false,
        props: {
            height: "200px",
            value: null,
            lang: "javascript",
            isDetail: false,
            required: false,
            readonly: false,
            hide: false,
            labelPosition: "left",
            zdname: null,
            label: "",
            labelAlign: "right",
            labelWidth: "120px",
            width: 24,

            onCreated: null,
            onMounted: null,
        }
    },
    button: {
        isContainer: false,
        displayName: "按钮",
        hasLabel: false,
        isForm: true,
        canAddDataTableQuery: false,
        canAddDataTableList: true,
        props: {
            type: "primary",
            size: "medium",
            icon: "",
            disabled: false,
            hide: false,
            isPlain: false,
            isRound: false,
            buttonText: "按钮",
            labelPosition: "left",
            // value: null,
            // zdname: null,
            label: "",
            labelAlign: "right",
            labelWidth: "120px",
            width: 24,

            onCreated: null,
            onMounted: null,
            onClick: null,
        }
    },
    divider: {
        isContainer: false,
        hasLabel: false,
        displayName: "分割线",
        isForm: false,
        canAddDataTableQuery: false,
        canAddDataTableList: false,
        props: {
            value: null,
            width: 24,

            onCreated: null,
            onMounted: null,
        }
    },
    title: {
        isContainer: false,
        hasLabel: false,
        displayName: "标题",
        isForm: false,
        canAddDataTableQuery: false,
        canAddDataTableList: false,
        props: {
            value: "标题",
            width: 24,

            onCreated: null,
            onMounted: null,
        }
    },
    datatable: {
        isContainer: false,
        hasLabel: false,
        displayName: "数据表格",
        isForm: true,
        widgetList: [],
        canAddDataTableQuery: false,
        canAddDataTableList: true,
        props: {
            zdname: null,
            label: "",
            labelAlign: "right",
            labelWidth: "120px",
            isDetail: false,
            width: 24,
            height: "80vh",
            required: false,
            value: [],
            apiSet: {
                method: "get",
                apiurl: "",
                params: [],
                contentType: "JSON",
                dataFormat: "",
            },
            tableConfig: {
                baseInfo: {
                    rows: "datas",
                    count: "totalCount",
                    page: "pageindex",
                    limit: "pagesize",
                    count: "totalCount",
                    pageDefault: 20,
                    singleselect: false,
                    align: "center",
                    hasPage: true,
                    showOverFlow: true,
                    initLoadData: true,
                    isStripe: true,
                    normalTable: false,
                    formTableMode: "table", //table/tab,
                    treeMode: false, //是否树形表格
                    treeTransform: false, //false为树形结构,true为扁平结构
                    treeRowField: "id", //树形结构的字段
                    treeParentField: "pid", //树形父级结构的字段
                    treeChildrenField: "children",
                    treeExpandAll: false,
                    treeAccordion: false,
                },
                buttonList: [],
                queryList: [],
                tableList: [],
            },
            onCreated: null,
            onMounted: null,
            onDataLoad: null,
        }
    },
    transfer: {
        isContainer: false,
        displayName: "穿梭框",
        hasLabel: true,
        isForm: true,
        canAddDataTableQuery: true,
        canAddDataTableList: true,
        props: {
            size: "medium",
            required: false,
            readonly: false,
            disabled: false,
            isDetail: false,
            hide: false,
            labelPosition: "left",
            value: [],
            zdname: null,
            label: "",
            labelAlign: "right",
            labelWidth: "120px",
            width: 24,
            propsKey: "key",
            propsLabel: "label",
            valueType:"keyArr",//keyArr,jsonArr
            apiSet: {
                method: "get",
                apiurl: "",
                params: [],
                contentType: "JSON",
                dataFormat: "",
            },
            list: [],
            onCreated: null,
            onMounted: null,
            // onChange: null,
        }
    },
    datatableitem: {
        isContainer: false,
        hasLabel: false,
        displayName: "数据表格表头",
        isForm: true,
        widgetList: [],
        canAddDataTableQuery: false,
        canAddDataTableList: true,
        addToPanel: false,
        props: {
            zdname: null,
            value: null,
            label: "",
            tableitemWidth: null,
            onCreated: null,
            onMounted: null,
            onFormat: null,
            hide:false,
        }
    },
}