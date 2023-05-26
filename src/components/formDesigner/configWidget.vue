<template>
  <div class="config_wrap" v-if="designer&&designer.chosenWidget">
    <div class="sy_wrap">
      <div class="title temp_wrapper">
        <span>基础属性</span>
        <el-button-group>
          <el-button size="mini" round plain type="primary" @click="saveTemplate">存为模板</el-button>
          <el-button size="mini" round plain type="primary" @click="importTemplate">引入模板</el-button>
        </el-button-group>
      </div>
      <div class="item">
        <div class="lab">唯一名称</div>
        <div class="con">
          <el-input v-model="designer.chosenWidget.props.id" size="mini" disabled></el-input>
        </div>
      </div>
      <div class="item" v-if="hasEvent('label')">
        <div class="lab">组件标签</div>
        <div class="con">
          <el-input v-model="designer.chosenWidget.props.label" size="mini" placeholder="标签"></el-input>
        </div>
      </div>
      <div class="item" v-if="hasEvent('zdname')">
        <div class="lab">字段名称</div>
        <div class="con">
          <el-input v-model="designer.chosenWidget.props.zdname" size="mini" placeholder="字段名称"></el-input>
        </div>
      </div>
      <div class="item" v-if="hasEvent('value')&&designer.chosenWidget.type!='file'">
        <div class="lab">默认赋值</div>
        <div class="con">
          <!-- <el-switch
            active-text="true"
            inactive-text="false"
            v-if="designer.chosenWidget.type=='switch'"
            v-model="designer.chosenWidget.props.value"
          ></el-switch>-->
          <span
            v-if="designer.chosenWidget.type=='datatable'||designer.chosenWidget.type=='transfer'"
          >{{ designer.chosenWidget.props.value }}</span>
          <CommonTypeInput
            v-else
            size="mini"
            placeholder="默认赋值"
            v-model="designer.chosenWidget.props.value"
          ></CommonTypeInput>

          <!-- <el-input
            v-else
            v-model="designer.chosenWidget.props.value"
            size="mini"
            placeholder="默认赋值"
          ></el-input>-->
        </div>
      </div>
      <div class="item" v-if="hasEvent('label')">
        <div class="lab">备注内容</div>
        <div class="con">
          <el-input v-model="designer.chosenWidget.props.remark" size="mini" placeholder="填写会有备注内容"></el-input>
        </div>
      </div>
      <!-- v-if="hasEvent('isDetail')" -->
      <div class="item">
        <div class="lab">详情模式</div>
        <div class="con">
          <el-switch
            active-text="详情模式"
            inactive-text="编辑模式"
            v-model="designer.chosenWidget.props.isDetail"
          ></el-switch>
        </div>
      </div>
      <div class="item" v-if="hasEvent('width')">
        <div class="lab">组件宽度</div>
        <div class="con">
          <el-slider
            style="width:96%"
            v-model="designer.chosenWidget.props.width"
            :min="6"
            :max="24"
            :step="2"
            show-stops
          ></el-slider>
        </div>
      </div>
      <div class="item" v-if="hasEvent('labelWidth')">
        <div class="lab">标签宽度</div>
        <div class="con">
          <el-input v-model="designer.chosenWidget.props.labelWidth" placeholder="标签宽度" size="mini"></el-input>
        </div>
      </div>
      <div class="item" v-if="hasEvent('tableitemWidth')">
        <div class="lab">表头宽度</div>
        <div class="con">
          <el-input
            v-model="designer.chosenWidget.props.tableitemWidth"
            placeholder="表头宽度"
            size="mini"
          ></el-input>
        </div>
      </div>

      <div class="item" v-if="hasEvent('labelPosition')">
        <div class="lab">标签位置</div>
        <div class="con">
          <el-radio-group v-model="designer.chosenWidget.props.labelPosition" size="mini">
            <el-radio-button label="left">居左</el-radio-button>
            <el-radio-button label="top">居上</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="item" v-if="hasEvent('labelAlign')">
        <div class="lab">标签对齐</div>
        <div class="con">
          <el-radio-group v-model="designer.chosenWidget.props.labelAlign" size="mini">
            <el-radio-button label="left">居左</el-radio-button>
            <el-radio-button label="center">居中</el-radio-button>
            <el-radio-button label="right">居右</el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
    <component
      v-if="designer.chosenWidget"
      :is="'config-'+designer.chosenWidget.type"
      :key="designer.chosenWidget.id"
      :designer="designer"
    ></component>
    <div class="item">
      <div class="lab">权限数据</div>
      <div class="con">
        <el-input v-model="designer.chosenWidget.props.roleData" placeholder="权限数据" size="mini"></el-input>
      </div>
    </div>
    <div class="sy_wrap" v-if="hasEvent('apiSet')">
      <div class="title">接口配置</div>
      <div class="item">
        <div class="lab">接口配置</div>
        <div class="con">
          <common-http-set
            :fieldVisible="'select|selects|radio|checkbox'.includes(designer.chosenWidget.type)"
            v-model="designer.chosenWidget.props.apiSet"
            :designer="designer"
          ></common-http-set>
        </div>
      </div>
    </div>
    <div class="sy_wrap">
      <div class="title">事件属性（蓝色为已编写）</div>
      <div class="item" v-if="hasEvent('onCreated')">
        <div class="lab">onCreated</div>
        <div class="con">
          <el-button
            icon="el-icon-edit"
            :type="designer.chosenWidget.props.onCreated?'primary':'info'"
            plain
            size="mini"
            round
            @click="showEditorHandle('onCreated')"
          >编写代码</el-button>
        </div>
      </div>
      <div class="item" v-if="hasEvent('onMounted')">
        <div class="lab">onMounted</div>
        <div class="con">
          <el-button
            icon="el-icon-edit"
            :type="designer.chosenWidget.props.onMounted?'primary':'info'"
            plain
            size="mini"
            round
            @click="showEditorHandle('onMounted')"
          >编写代码</el-button>
        </div>
      </div>
      <div class="item" v-if="hasEvent('onInput')">
        <div class="lab">onInput</div>
        <div class="con">
          <el-button
            icon="el-icon-edit"
            :type="designer.chosenWidget.props.onInput?'primary':'info'"
            plain
            size="mini"
            round
            @click="showEditorHandle('onInput')"
          >编写代码</el-button>
        </div>
      </div>
      <div class="item" v-if="hasEvent('onChange')">
        <div class="lab">onChange</div>
        <div class="con">
          <el-button
            icon="el-icon-edit"
            :type="designer.chosenWidget.props.onChange?'primary':'info'"
            plain
            size="mini"
            round
            @click="showEditorHandle('onChange')"
          >编写代码</el-button>
        </div>
      </div>
      <div class="item" v-if="hasEvent('onFocus')">
        <div class="lab">onFocus</div>
        <div class="con">
          <el-button
            icon="el-icon-edit"
            :type="designer.chosenWidget.props.onFocus?'primary':'info'"
            plain
            size="mini"
            round
            @click="showEditorHandle('onFocus')"
          >编写代码</el-button>
        </div>
      </div>
      <div class="item" v-if="hasEvent('onBlur')">
        <div class="lab">onBlur</div>
        <div class="con">
          <el-button
            icon="el-icon-edit"
            :type="designer.chosenWidget.props.onBlur?'primary':'info'"
            plain
            size="mini"
            round
            @click="showEditorHandle('onBlur')"
          >编写代码</el-button>
        </div>
      </div>
      <div class="item" v-if="hasEvent('onClick')">
        <div class="lab">onClick</div>
        <div class="con">
          <el-button
            icon="el-icon-edit"
            :type="designer.chosenWidget.props.onClick?'primary':'info'"
            plain
            size="mini"
            round
            @click="showEditorHandle('onClick')"
          >编写代码</el-button>
        </div>
      </div>
      <div class="item" v-if="hasEvent('onShow')">
        <div class="lab">onShow</div>
        <div class="con">
          <el-button
            icon="el-icon-edit"
            :type="designer.chosenWidget.props.onShow?'primary':'info'"
            plain
            size="mini"
            round
            @click="showEditorHandle('onShow')"
          >编写代码</el-button>
        </div>
      </div>
      <div class="item" v-if="hasEvent('onHide')">
        <div class="lab">onHide</div>
        <div class="con">
          <el-button
            icon="el-icon-edit"
            :type="designer.chosenWidget.props.onHide?'primary':'info'"
            plain
            size="mini"
            round
            @click="showEditorHandle('onHide')"
          >编写代码</el-button>
        </div>
      </div>
      <div class="item" v-if="hasEvent('onFormat')">
        <div class="lab">onFormat</div>
        <div class="con">
          <el-button
            icon="el-icon-edit"
            :type="designer.chosenWidget.props.onFormat?'primary':'info'"
            plain
            size="mini"
            round
            @click="showEditorHandle('onFormat')"
          >编写代码</el-button>
        </div>
      </div>
      <div class="item" v-if="hasEvent('onTableClick')">
        <div class="lab">onTableClick</div>
        <div class="con">
          <el-button
            icon="el-icon-edit"
            :type="designer.chosenWidget.props.onTableClick?'primary':'info'"
            plain
            size="mini"
            round
            @click="showEditorHandle('onTableClick')"
          >编写代码</el-button>
        </div>
      </div>
      <div class="item" v-if="hasEvent('onConfirm')">
        <div class="lab">onConfirm</div>
        <div class="con">
          <el-button
            icon="el-icon-edit"
            :type="designer.chosenWidget.props.onConfirm?'primary':'info'"
            plain
            size="mini"
            round
            @click="showEditorHandle('onConfirm')"
          >编写代码</el-button>
        </div>
      </div>
      <div class="item" v-if="hasEvent('onHandle')">
        <div class="lab">onHandle</div>
        <div class="con">
          <el-button
            icon="el-icon-edit"
            :type="designer.chosenWidget.props.onHandle?'primary':'info'"
            plain
            size="mini"
            round
            @click="showEditorHandle('onHandle')"
          >编写代码</el-button>
        </div>
      </div>
      <div class="item" v-if="hasEvent('onDataLoad')">
        <div class="lab">onDataLoad</div>
        <div class="con">
          <el-button
            icon="el-icon-edit"
            :type="designer.chosenWidget.props.onDataLoad?'primary':'info'"
            plain
            size="mini"
            round
            @click="showEditorHandle('onDataLoad')"
          >编写代码</el-button>
        </div>
      </div>
      <div class="item" v-if="hasEvent('onButtonFormat')">
        <div class="lab">onButtonFormat</div>
        <div class="con">
          <el-button
            icon="el-icon-edit"
            :type="designer.chosenWidget.props.onButtonFormat?'primary':'info'"
            plain
            size="mini"
            round
            @click="showEditorHandle('onButtonFormat')"
          >编写代码</el-button>
        </div>
      </div>
      <div class="item" v-if="hasEvent('onNameFormat')">
        <div class="lab">onNameFormat</div>
        <div class="con">
          <el-button
            icon="el-icon-edit"
            :type="designer.chosenWidget.props.onNameFormat?'primary':'info'"
            plain
            size="mini"
            round
            @click="showEditorHandle('onNameFormat')"
          >编写代码</el-button>
        </div>
      </div>
      <div class="item" v-if="designer.chosenWidget.type=='modal'">
        <div class="lab">onButtonClick</div>
        <div class="con">
          <el-button
            icon="el-icon-edit"
            :type="designer.chosenWidget.props.onButtonClick?'primary':'info'"
            plain
            size="mini"
            round
            @click="showEditorHandle('onButtonClick')"
          >编写代码</el-button>
        </div>
      </div>
    </div>
    <vxe-modal
      v-model="showEditor"
      id="model4"
      width="1200"
      height="600"
      show-footer
      :transfer="true"
      :destroy-on-close="true"
    >
      <template #title>
        <span>{{tmpEventName}} 函数</span>
      </template>
      <template #default>
        <CommonTreeCodeEditor
          :functionName="tmpEventName"
          :funcProps="formatEventProps()"
          v-model="jsData"
          v-if="showEditor"
          :designer="designer"
        ></CommonTreeCodeEditor>
      </template>
      <template #footer>
        <el-button size="mini" icon="el-icon-close" @click="showEditor=false">取消</el-button>
        <el-button size="mini" icon="el-icon-check" type="primary" @click="confirmJson">确定</el-button>
      </template>
    </vxe-modal>
  </div>
  <div class="empty" v-else>请先选择一个组件</div>
</template>

<script>
export default {
  props: {
    designer: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: {
    editor: require("vue2-ace-editor")
  },
  name: "configWidget",
  data() {
    return {
      showPopover: false,
      gridData: [],
      options: {
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true /*自动补全*/
      },
      showEditor: false,
      jsData: null,
      tmpEventName: null,
      defaultProps: {
        children: "widgetList",
        label: "displayName"
      }
    };
  },
  methods: {
    saveTemplate() {
      var temp = localStorage.getItem("sunFormTemplate");
      var w = this.designer.chosenWidget;
      if (temp) {
        temp = JSON.parse(temp);
        if (temp[w.type]) {
          this.$confirm("是否覆盖原有模板", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              temp[w.type] = w;
              localStorage.setItem("sunFormTemplate", JSON.stringify(temp));
              this.$message({
                type: "success",
                message: "模板保存成功"
              });
            })
            .catch(() => {});
        } else {
          temp[w.type] = w;
          localStorage.setItem("sunFormTemplate", JSON.stringify(temp));
          this.$message({
            type: "success",
            message: "模板保存成功"
          });
        }
      } else {
        var obj = {};
        obj[w.type] = w;
        localStorage.setItem("sunFormTemplate", JSON.stringify(obj));
        this.$message({
          type: "success",
          message: "模板保存成功"
        });
      }
    },
    importTemplate() {
      var temp = localStorage.getItem("sunFormTemplate");
      var w = this.designer.chosenWidget;
      if (temp) {
        temp = JSON.parse(temp);
        if (temp[w.type]) {
          this.$confirm("是否覆盖原有组件", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              var o = temp[w.type];
              var ignoreField = "id,label,value,zdname,widgetList";
              for (var i in w) {
                if (i == "props") {
                  for (var j in w["props"]) {
                    if (
                      !ignoreField.includes(j) &&
                      o["props"].hasOwnProperty(j)
                    ) {
                      this.$set(w["props"], j, o["props"][j]);
                    }
                  }
                } else {
                  if (!ignoreField.includes(i) && o.hasOwnProperty(i)) {
                    this.$set(w, i, o[i]);
                  }
                }
              }
              this.$message({
                type: "success",
                message: "模板导入成功"
              });
            })
            .catch(() => {});
        } else {
          this.$message({
            type: "info",
            message: "没有可导入的模板"
          });
        }
      } else {
        this.$message({
          type: "info",
          message: "没有可导入的模板"
        });
      }
    },
    tabRowClick(row) {
      this.$refs.editor.insertCode(row.example);
      this.showPopover = false;
    },
    formatTable(type, id) {
      var table = this.$utils.clone(this.designer.remark[type], true);
      table.forEach(item => {
        if (item.example.includes("{id}")) {
          item.example = item.example.replace("{id}", `"${id}"`);
        }
      });
      return table;
    },
    chooseCode(node, data) {
      this.$refs.editor.insertCode(`app.getWidget("${data.id}")`);
    },
    hasEvent(type) {
      return this.designer.chosenWidget.props.hasOwnProperty(type);
    },
    formatEventProps() {
      var d = this.tmpEventName;
      switch (d) {
        case "onCreated":
          return "self";
          break;
        case "onMounted":
          return "self";
          break;
        case "onClick":
          return "self";
          break;
        case "onHandle":
          return "value , self";
          break;
        case "onChange":
          return "value , self";
          break;
        case "onFocus":
          return "value , self";
          break;
        case "onBlur":
          return "value , self";
          break;
        case "onInput":
          return "value , self";
          break;
        case "onFormat":
          return "row , zdname , self";
          break;
        case "onTableClick":
          return "chosen , rowIndex , self";
          break;
        case "onConfirm":
          return "self";
          break;
        case "onDataLoad":
          return "self";
          break;
        case "onButtonFormat":
          return "row";
          break;
        case "onNameFormat":
          return "file , self";
          break;
        case "onButtonClick":
          return "key , self";
          break;
        default:
          return "";
          break;
      }
    },
    showEditorHandle(type) {
      this.tmpEventName = type;
      this.jsData = this.designer.chosenWidget.props[type];
      this.showEditor = true;
    },
    confirmJson() {
      this.designer.chosenWidget.props[this.tmpEventName] = this.jsData;
      this.showEditor = false;
    },
    editorInit: function(type) {
      require("brace/mode/javascript"); //language
      require("brace/ext/searchbox"); //language
      require("brace/ext/beautify");
      require("brace/theme/monokai");
      this.$refs.edit1.editor.setShowFoldWidgets(true);
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped lang="scss">
.sy_form_show_wrap {
  height: 100%;
  display: flex;

  .form_side {
    box-sizing: border-box;
    flex: 0 0 400px;
    border: 1px solid #409eff;
    margin-right: 10px;
    padding: 5px 5px 0px;
    box-sizing: border-box;
    overflow: auto;
    .tree_title_func {
      width: 100%;
      display: flex;
      flex-direction: row-reverse;
      font-size: 12px;
      color: #909399;
      cursor: pointer;
    }
    .custom-tree-node {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .el-button {
        padding: 0;
        margin: 0;
        font-size: 12px;
        color: #909399;
        &:hover {
          color: #409eff;
        }
      }
      .el-button:nth-child(2) {
        margin-left: 5px;
      }
      .tree_title {
        font-size: 12px;
        white-space: nowrap;
        .tree_id {
          font-size: 12px;
          color: #409eff;
          font-style: italic;
        }
      }
    }
  }
  .form_content {
    flex: 1;
    border: 1px solid blue;
    display: flex;
    height: 100%;
    flex-direction: column;
    .bar {
      background: rgb(47, 49, 41);
      color: rgb(95, 196, 214);
      font-weight: bold;
      font-size: 16px;
      padding: 5px 10px;
      box-sizing: border-box;
      font-style: italic;
      .code {
        color: rgb(213, 214, 208);
      }
    }
  }
}
.empty {
  color: #999;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-weight: bold;
  font-size: 20px;
  height: 80vh;
}
.temp_wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.con {
  .el-button {
    margin-left: 5px;
  }
}
</style>