export default {
    app: [{
        name: "console.log",
        description: "打印日志",
        example: `console.log(message)`,
    }, {
        name: "app.$http.get",
        description: "get请求",
        example: `app.$http.get(url, data)
    .then(res => {
        //do something
    })`,
    }, {
        name: "app.$http.getBlob",
        description: "获取文件",
        example: `app.$http.getBlob(url, data)
    .then(res => {
        //do something
    })`,
    }, {
        name: "app.$http.post",
        description: "post请求",
        example: `app.$http.post(url, data)
    .then(res => {
        //do something
    })`,
    }, {
        name: "app.$http.put",
        description: "put请求",
        example: `app.$http.put(url, data)
    .then(res => {
        //do something
    })`,
    }, {
        name: "app.$http.patch",
        description: "patch请求",
        example: `app.$http.patch(url, data)
    .then(res => {
        //do something
    })`,
    }, {
        name: "app.$http.delete",
        description: "delete请求",
        example: `app.$http.delete(url, data)
    .then(res => {
        //do something
    })`,
    }, {
        name: "app.$http.postFormData",
        description: "formdata的post请求",
        example: `app.$http.postFormData(url, data)
    .then(res => {
        //do something
    })`,
    }, {
        name: "app.$http.postFile",
        description: "上传文件",
        example: `app.$http.postFile(url, data)
    .then(res => {
        //do something
    })`,
    }, {
        name: "app.$http.putFormData",
        description: "formdata的put请求",
        example: `app.$http.putFormData(url, data)
    .then(res => {
        //do something
    })`,
    }, {
        name: "app.$http.patchFormData",
        description: "formdata的patch请求",
        example: `app.$http.patchFormData(url, data)
    .then(res => {
        //do something
    })`,
    }, {
        name: "app.$message.success",
        description: "成功提示",
        example: `app.$message.success(message)`
    }, {
        name: "app.$message.error",
        description: "错误提示",
        example: `app.$message.error(message)`
    }, {
        name: "app.$message.warning",
        description: "警告提示",
        example: `app.$message.warning(message)`
    }, {
        name: "app.$message.info",
        description: "信息提示",
        example: `app.$message.info(message)`
    }, {
        name: "app.$confirm",
        description: "确定提示",
        example: `app.$confirm("是否确定", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    })
    .then(() => {})
    .catch(() => {});`
    }, {
        name: "app.setParam",
        description: "设置全局参数",
        example: `app.setParam(key, value)`
    }, {
        name: "app.getParam",
        description: "获取全局参数",
        example: `app.getParam(key)`
    }, {
        name: "app.getParentApp",
        description: "获取父级app",
        example: `app.getParentApp()`
    }, {
        name: "app.getQueryString",
        description: "获取url参数",
        example: `app.getQueryString()`
    }, {
        name: "app.eventToParent",
        description: "触发父级组件事件",
        example: `app.eventToParent(val)`
    }],
    tabs: [{
        name: "app.getWidget",
        description: "获取组件Vue实例",
        example: `app.getWidget({id})`
    }, {
        name: "app.setHide",
        description: "设置隐藏",
        example: `app.setHide({id}, type)`
    }],
    grid: [{
        name: "app.getWidget",
        description: "获取组件Vue实例",
        example: `app.getWidget({id})`
    }, {
        name: "app.reset",
        description: "重置表单数据",
        example: `app.getWidget({id}).reset()`
    }, {
        name: "app.setFormType",
        description: "设置表单类型Create/Update/Detail",
        example: `app.setFormType({id}, type)`
    }, {
        name: "app.getFormType",
        description: "获取表单类型Create/Update/Detail",
        example: `app.getWidget({id}).getFormType()`
    }, {
        name: "app.setHide",
        description: "设置隐藏",
        example: `app.setHide({id}, type)`
    }, {
        name: "app.getResult",
        description: "获取表单数据",
        example: `app.getWidget({id}).getResult()`
    }, {
        name: "app.inputData",
        description: "设置表单数据",
        example: `app.getWidget({id}).inputData({})`
    }],
    file: [{
        name: "app.getWidget",
        description: "获取组件Vue实例",
        example: `app.getWidget({id})`
    }, {
        name: "app.setHide",
        description: "设置隐藏",
        example: `app.setHide({id}, type)`
    }],
    service: [{
        name: "app.getWidget",
        description: "获取组件Vue实例",
        example: `app.getWidget({id})`
    }, {
        name: "app.getApp",
        description: "获取服务组件下的app",
        example: `app.getWidget({id}).getApp()`
    }, {
        name: "app.setHide",
        description: "设置隐藏",
        example: `app.setHide({id}, type)`
    }],
    modal: [{
        name: "app.getWidget",
        description: "获取组件Vue实例",
        example: `app.getWidget({id})`
    }, {
        name: "app.setHide",
        description: "设置隐藏",
        example: `app.setHide({id}, type)`
    }, {
        name: "app.confirm",
        description: "点击弹窗确定按钮",
        example: `app.getWidget({id}).confirm()`
    }, {
        name: "app.open",
        description: "打开弹窗并传入回调函数",
        example: `app.getWidget({id}).open(function(){
            //do something
})`
    }, {
        name: "app.close",
        description: "关闭弹窗并传入回调函数",
        example: `app.getWidget({id}).close(function(){
            //do something
})`
    }],
    input: [{
        name: "app.getWidget",
        description: "获取组件Vue实例",
        example: `app.getWidget({id})`
    }, {
        name: "app.setHide",
        description: "设置隐藏",
        example: `app.setHide({id}, type)`
    }, {
        name: "app.setRequired",
        description: "设置必填",
        example: `app.setRequired({id}, type)`
    }, {
        name: "app.setValue",
        description: "设置值",
        example: `app.setValue({id}, value)`,
    }, {
        name: "app.getValue",
        description: "设置值",
        example: `app.getValue({id})`,
    }],
    switch: [{
        name: "app.getWidget",
        description: "获取组件Vue实例",
        example: `app.getWidget({id})`
    }, {
        name: "app.setHide",
        description: "设置隐藏",
        example: `app.setHide({id}, type)`
    }, {
        name: "app.setRequired",
        description: "设置必填",
        example: `app.setRequired({id}, type)`
    }, {
        name: "app.setValue",
        description: "设置值",
        example: `app.setValue({id}, value)`,
    }, {
        name: "app.getValue",
        description: "设置值",
        example: `app.getValue({id})`,
    }],
    codeEditor: [{
        name: "app.getWidget",
        description: "获取组件Vue实例",
        example: `app.getWidget({id})`
    }, {
        name: "app.setHide",
        description: "设置隐藏",
        example: `app.setHide({id}, type)`
    }, {
        name: "app.setRequired",
        description: "设置必填",
        example: `app.setRequired({id}, type)`
    }, {
        name: "app.setValue",
        description: "设置值",
        example: `app.setValue({id}, value)`,
    }, {
        name: "app.getValue",
        description: "设置值",
        example: `app.getValue({id})`,
    }],
    textarea: [{
        name: "app.getWidget",
        description: "获取组件Vue实例",
        example: `app.getWidget({id})`
    }, {
        name: "app.setHide",
        description: "设置隐藏",
        example: `app.setHide({id}, type)`
    }, {
        name: "app.setRequired",
        description: "设置必填",
        example: `app.setRequired({id}, type)`
    }, {
        name: "app.setValue",
        description: "设置值",
        example: `app.setValue({id}, value)`,
    }, {
        name: "app.getValue",
        description: "设置值",
        example: `app.getValue({id})`,
    }],
    radio: [{
        name: "app.getWidget",
        description: "获取组件Vue实例",
        example: `app.getWidget({id})`
    }, {
        name: "app.setHide",
        description: "设置隐藏",
        example: `app.setHide({id}, type)`
    }, {
        name: "app.setRequired",
        description: "设置必填",
        example: `app.setRequired({id}, type)`
    }, {
        name: "app.setValue",
        description: "设置值",
        example: `app.setValue({id}, value)`,
    }, {
        name: "app.getValue",
        description: "设置值",
        example: `app.getValue({id})`,
    }, {
        name: "app.setList",
        description: "设置选项列表",
        example: `app.getWidget({id}).setList([])`
    }],
    checkbox: [{
        name: "app.getWidget",
        description: "获取组件Vue实例",
        example: `app.getWidget({id})`
    }, {
        name: "app.setHide",
        description: "设置隐藏",
        example: `app.setHide({id}, type)`
    }, {
        name: "app.setRequired",
        description: "设置必填",
        example: `app.setRequired({id}, type)`
    }, {
        name: "app.setValue",
        description: "设置值",
        example: `app.setValue({id}, value)`,
    }, {
        name: "app.getValue",
        description: "设置值",
        example: `app.getValue({id})`,
    }, {
        name: "app.setList",
        description: "设置选项列表",
        example: `app.getWidget({id}).setList([])`
    }],
    select: [{
        name: "app.getWidget",
        description: "获取组件Vue实例",
        example: `app.getWidget({id})`
    }, {
        name: "app.setHide",
        description: "设置隐藏",
        example: `app.setHide({id}, type)`
    }, {
        name: "app.setRequired",
        description: "设置必填",
        example: `app.setRequired({id}, type)`
    }, {
        name: "app.setValue",
        description: "设置值",
        example: `app.setValue({id}, value)`,
    }, {
        name: "app.getValue",
        description: "设置值",
        example: `app.getValue({id})`,
    }, {
        name: "app.setList",
        description: "设置选项列表",
        example: `app.getWidget({id}).setList([])`
    }],
    selects: [{
        name: "app.getWidget",
        description: "获取组件Vue实例",
        example: `app.getWidget({id})`
    }, {
        name: "app.setHide",
        description: "设置隐藏",
        example: `app.setHide({id}, type)`
    }, {
        name: "app.setRequired",
        description: "设置必填",
        example: `app.setRequired({id}, type)`
    }, {
        name: "app.setValue",
        description: "设置值",
        example: `app.setValue({id}, value)`,
    }, {
        name: "app.getValue",
        description: "设置值",
        example: `app.getValue({id})`,
    }, {
        name: "app.setList",
        description: "设置选项列表",
        example: `app.getWidget({id}).setList([])`
    }],
    date: [{
        name: "app.getWidget",
        description: "获取组件Vue实例",
        example: `app.getWidget({id})`
    }, {
        name: "app.setHide",
        description: "设置隐藏",
        example: `app.setHide({id}, type)`
    }, {
        name: "app.setRequired",
        description: "设置必填",
        example: `app.setRequired({id}, type)`
    }, {
        name: "app.setValue",
        description: "设置值",
        example: `app.setValue({id}, value)`,
    }, {
        name: "app.getValue",
        description: "设置值",
        example: `app.getValue({id})`,
    }],
    daterange: [{
        name: "app.getWidget",
        description: "获取组件Vue实例",
        example: `app.getWidget({id})`
    }, {
        name: "app.setHide",
        description: "设置隐藏",
        example: `app.setHide({id}, type)`
    }, {
        name: "app.setRequired",
        description: "设置必填",
        example: `app.setRequired({id}, type)`
    }, {
        name: "app.setValue",
        description: "设置值",
        example: `app.setValue({id}, value)`,
    }, {
        name: "app.getValue",
        description: "设置值",
        example: `app.getValue({id})`,
    }],
    time: [{
        name: "app.getWidget",
        description: "获取组件Vue实例",
        example: `app.getWidget({id})`
    }, {
        name: "app.setHide",
        description: "设置隐藏",
        example: `app.setHide({id}, type)`
    }, {
        name: "app.setRequired",
        description: "设置必填",
        example: `app.setRequired({id}, type)`
    }, {
        name: "app.setValue",
        description: "设置值",
        example: `app.setValue({id}, value)`,
    }, {
        name: "app.getValue",
        description: "设置值",
        example: `app.getValue({id})`,
    }],
    timerange: [{
        name: "app.getWidget",
        description: "获取组件Vue实例",
        example: `app.getWidget({id})`
    }, {
        name: "app.setHide",
        description: "设置隐藏",
        example: `app.setHide({id}, type)`
    }, {
        name: "app.setRequired",
        description: "设置必填",
        example: `app.setRequired({id}, type)`
    }, {
        name: "app.setValue",
        description: "设置值",
        example: `app.setValue({id}, value)`,
    }, {
        name: "app.getValue",
        description: "设置值",
        example: `app.getValue({id})`,
    }],
    button: [{
        name: "app.getWidget",
        description: "获取组件Vue实例",
        example: `app.getWidget({id})`
    }, {
        name: "app.setHide",
        description: "设置隐藏",
        example: `app.setHide({id}, type)`
    }],
    divider: [{
        name: "app.getWidget",
        description: "获取组件Vue实例",
        example: `app.getWidget({id})`
    }, {
        name: "app.setHide",
        description: "设置隐藏",
        example: `app.setHide({id}, type)`
    }],
    title: [{
        name: "app.getWidget",
        description: "获取组件Vue实例",
        example: `app.getWidget({id})`
    }, {
        name: "app.setHide",
        description: "设置隐藏",
        example: `app.setHide({id}, type)`
    }],
    datatable: [{
            name: "app.getWidget",
            description: "获取组件Vue实例",
            example: `app.getWidget({id})`
        }, {
            name: "app.setHide",
            description: "设置隐藏",
            example: `app.setHide({id}, type)`
        },
        {
            name: "app.setValue",
            description: "设置值",
            example: `app.setValue({id}, value)`,
        }, {
            name: "app.refresh",
            description: "刷新表格",
            example: `app.getWidget({id}).refresh()`
        }, {
            name: "app.chosen",
            description: "获取表格选中数据",
            example: `app.getWidget({id}).chosen()`
        }, {
            name: "app.getRows",
            description: "普通表格获取所有表格数据",
            example: `app.getWidget({id}).getRows()`
        }, {
            name: "app.setRows",
            description: "普通表格设置所有表格数据",
            example: `app.getWidget({id}).setRows([])`
        },
        {
            name: "app.clearRow",
            description: "普通表格清空表格数据",
            example: `app.getWidget({id}).clearRow()`
        }, {
            name: "app.addRow",
            description: "普通表格添加一行默认数据",
            example: `app.getWidget({id}).addRow()`
        }, {
            name: "app.addRowByObject",
            description: "普通表格添加一行数据",
            example: `app.getWidget({id}).addRowByObject()`
        }, {
            name: "app.removeRow",
            description: "普通表格删除一行数据",
            example: `app.getWidget({id}).removeRow(rowIndex)`
        }, {
            name: "app.allTreeChosen",
            description: "树形表格获取所有选中数据",
            example: `app.getWidget({id}).allTreeChosen()`
        }, {
            name: "app.halfChosen",
            description: "树形表格获取半选中数据",
            example: `app.getWidget({id}).halfChosen()`
        }, {
            name: "app.setAllTreeExpand",
            description: "树形表格展开/收起所有节点",
            example: `app.getWidget({id}).setAllTreeExpand(true)`
        }, {
            name: "app.setRowsCheckedByIds",
            description: "树形表格根据id设置选中",
            example: `app.getWidget({id}).setRowsCheckedByIds([])`
        }
    ],
    datatableitem: [{
        name: "app.getWidget",
        description: "获取组件Vue实例",
        example: `app.getWidget({id})`
    }, {
        name: "app.setHide",
        description: "设置隐藏",
        example: `app.setHide({id}, type)`
    }]
}