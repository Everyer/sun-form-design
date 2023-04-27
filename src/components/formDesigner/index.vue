<template>
  <div class="sy_formdesign_wrap">
    <div class="side panel_side" ref="side">
      <panel-widget :designer="designer"></panel-widget>
    </div>
    <div class="content" ref="content">
      <div class="tools_wrap">
        <div class="logo"></div>
        <div class="tools_item_wrap">
          <div class="tools_item">
            <el-button type="primary" size="mini" round icon="el-icon-view" @click="showForm">预览</el-button>
          </div>
          <div class="tools_item">
            <el-button
              type="primary"
              size="mini"
              :data-clipboard-text="JSON.stringify(designer.widgetList)"
              @click="copyJSON"
              round
              class="clipboardBtn"
              icon="el-icon-document-copy"
            >复制</el-button>
          </div>
          <div class="tools_item">
            <el-button type="primary" size="mini" round icon="el-icon-delete" @click="clear">清空</el-button>
          </div>
          <div class="tools_item">
            <el-button
              type="primary"
              size="mini"
              round
              icon="el-icon-s-data"
              @click="showCodeHandle(0)"
            >组件源码</el-button>
          </div>
          <div class="tools_item">
            <el-button
              type="primary"
              size="mini"
              round
              icon="el-icon-s-data"
              @click="showCodeHandle(1)"
            >整页源码</el-button>
          </div>
        </div>
      </div>
      <div class="form_wrap">
        <form-widget :designer="designer"></form-widget>
        <div class="no_data" v-if="!designer.widgetList.length">请从左侧列表中选择一个组件, 然后用鼠标拖动组件放置于此处.</div>
      </div>
    </div>
    <div class="side config_side">
      <config-widget :designer="designer"></config-widget>
    </div>
    <vxe-modal
      v-model="showCode"
      :fullscreen="false"
      width="80%"
      show-footer
      height="80%"
      :transfer="true"
      :destroy-on-close="true"
    >
      <template #title>
        <span>源码</span>
      </template>
      <template #default>
        <div class="form_show_wrap" style="height:100%">
          <common-code-editor
            ref="codeEditor"
            lang="javascript"
            :readonly="false"
            height="100%"
            v-model="jsonCode"
          ></common-code-editor>
        </div>
      </template>
      <template #footer>
        <el-button size="mini" icon="el-icon-close" @click="showCode=false">取消</el-button>
        <el-button size="mini" icon="el-icon-check" type="primary" @click="confirmJson">确定</el-button>
      </template>
    </vxe-modal>
    <vxe-modal
      v-model="show"
      :fullscreen="false"
      width="95%"
      height="95%"
      :transfer="true"
      :destroy-on-close="true"
      @hide="hideModal"
    >
      <template #title>
        <span>预览表单</span>
      </template>
      <template #default>
        <div class="form_show_wrap">
          <sunForm
            v-if="widgetList.length"
            :baseUrl="baseUrl"
            :headers="headers"
            :widgetList="widgetList"
            :httpSuccessHandle="httpSuccessHandle"
            :httpErrorHandle="httpErrorHandle"
            :httpBeforeSendHandle="httpBeforeSendHandle"
          ></sunForm>
        </div>
      </template>
    </vxe-modal>
  </div>
</template>

<script>
import Vue from "vue";
import formWidget from "./formWidget";
import panelWidget from "./panelWidget";
import configWidget from "./configWidget";
import { createDesigner } from "../../mixins/designer";
import Clipboard from "clipboard";
import { js_beautify } from "../../util/jsformat";
import "../importComp";
export default {
  components: { formWidget, panelWidget, configWidget },
  name: "sunDesigner",
  props: {
    baseUrl: {
      type: String,
      default: () => {
        return "";
      }
    },
    value: {
      type: [Object, Array],
      default: () => {
        return null;
      }
    },
    headers: {
      type: Object,
      default: () => {
        return {};
      }
    },
    httpSuccessHandle: {
      type: Function,
      default: () => {
        return null;
      }
    },
    httpErrorHandle: {
      type: Function,
      default: () => {
        return null;
      }
    },
    httpBeforeSendHandle: {
      type: Function,
      default: () => {
        return null;
      }
    }
  },
  model: {
    event: "changeHandle"
  },
  data() {
    return {
      designer: createDesigner(
        this,
        null,
        this.headers,
        null,
        null,
        this.baseUrl,
        this.httpSuccessHandle,
        this.httpErrorHandle,
        this.httpBeforeSendHandle
      ),
      timer: null,
      showCode: false,
      show: false,
      jsonCode: "",
      widgetList: [],
      originWidgetList: [],
      codeType: 0
    };
  },
  methods: {
    showCodeHandle(type) {
      this.codeType = type;
      if (type === 0) {
        this.jsonCode = js_beautify(JSON.stringify(this.designer.chosenWidget));
      }
      if (type === 1) {
        this.jsonCode = js_beautify(JSON.stringify(this.designer.widgetList));
      }
      this.showCode = true;
    },
    confirmJson() {
      var json = this.jsonCode;
      if (this.codeType === 0) {
        var id = this.designer.chosenWidget.id;
        var w = this.$utils.clone(this.designer.widgetList, true);
        var findIdandReplaceJson = function(widgetList) {
          for (var i = 0; i < widgetList.length; i++) {
            if (widgetList[i].id == id) {
              widgetList[i] = JSON.parse(json);
              return;
            }
            if (widgetList[i].widgetList) {
              findIdandReplaceJson(widgetList[i].widgetList);
            }
          }
        };
        findIdandReplaceJson(w);
        this.$set(this.designer, "widgetList", w);
      } else {
        this.$set(this.designer, "widgetList", JSON.parse(json));
      }
      this.showCode = false;
    },
    setJSON(data) {
      this.designer.widgetList = this.$utils.clone(data, true);
    },
    getJSON() {
      return this.$utils.clone(this.designer.widgetList, true);
    },
    copyJSON() {
      let clipboard = new Clipboard(".clipboardBtn");
      clipboard.on("success", e => {
        this.$message.success("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        // 释放内存
        clipboard.destroy();
      });
    },
    hideModal() {
      this.widgetList = this.originWidgetList;
    },
    showForm() {
      var w = this.$utils.clone(this.designer.widgetList, true);
      var w2 = this.$utils.clone(this.designer.widgetList, true);
      this.originWidgetList = w2;
      this.widgetList = w;
      this.show = true;
    },
    clear() {
      this.$confirm("确定清空吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.designer.widgetList = [];
          localStorage.removeItem("widgetList");
          this.$message({
            type: "success",
            message: "清空成功!"
          });
        })
        .catch(() => {});
    }
  },
  created() {
    if (this.value) {
      localStorage.setItem("widgetList", JSON.stringify(this.value));
    }
  },
  mounted() {
    if (
      localStorage.getItem("widgetList") &&
      this.designer.widgetList.length == 0
    ) {
      var w = JSON.parse(localStorage.getItem("widgetList"));
      this.designer.widgetList = w;
    }
  },
  watch: {
    "designer.chosenWidget": {
      handler(val) {
        if (val) {
          this.jsonCode = js_beautify(JSON.stringify(val));
        }
      },
      deep: true
    },
    "designer.widgetList": {
      handler(val) {
        this.$emit("changeHandle", this.$utils.clone(val, true));
        this.designer.returnChosen();
        clearInterval(this.timer);
        this.timer = setTimeout(() => {
          localStorage.setItem("widgetList", JSON.stringify(val));
        }, 500);
        if (val.length === 0) {
          this.designer.chosenWidget = null;
        }
      },
      deep: true
    }
  }
};
</script>

<style scoped lang="scss">
* {
  user-select: none;
}
.sy_formdesign_wrap {
  height: 100%;
  display: flex;
  .side {
    flex: 0 0 330px;
    box-sizing: border-box;
    height: 100%;
    overflow-y: auto;
    z-index: 2;

    // border-right: 1px solid #ccc;
    padding: 3px 10px;
    .item {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      overflow-y: auto;
      text-align: center;
      background: lightblue;
      margin: 3px 0;
      cursor: pointer;
    }
  }
  .panel_side {
    box-shadow: 2px 0 20px 0 rgba(0, 0, 0, 0.1);
  }
  .config_side {
    overflow-y: auto;
    box-shadow: -2px 0 20px 0 rgba(0, 0, 0, 0.1);
  }
  .content {
    flex: 1;
    overflow: auto;
    box-sizing: border-box;
    padding: 10px 0;
    position: relative;
    height: 100%;
    overflow-y: auto;
    padding-top: 0;
    display: flex;
    flex-direction: column;
    z-index: 3;
    .tools_wrap {
      width: 100%;
      background: #ffffff;
      box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.1);
      z-index: 2;
      flex: 0 0 43px;
      box-sizing: border-box;
      // border-bottom: 1px solid #ccc;
      display: flex;
      justify-content: space-between;
      .logo {
        width: 150px;
        display: flex;
        align-items: center;
        margin-left: 15px;
        height: 43px;
        background-image: url("../../assets/img/logo.png");
        background-repeat: no-repeat;
        background-size: contain;
        transform: skew(-10deg);
        img {
          width: 100%;
        }
      }
      // flex-direction: row-reverse;
      .tools_item_wrap {
        display: flex;
        align-items: center;
        padding-right: 30px;
        .tools_item {
          margin: 0 3px;
        }
      }
    }
    .form_wrap {
      flex: 1;
      overflow-y: auto;
      padding: 10px 10px;
      position: relative;
      .no_data {
        color: #999;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        width: 100%;
        font-weight: bold;
        font-size: 20px;
        height: 80vh;
        left: 0;
        top: 0;
      }
    }
  }
}
</style>
<style lang="scss">
.vxe-modal--wrapper.is--visible.is--mask:before {
  backdrop-filter: blur(3px) !important;
}
* {
  ::-webkit-scrollbar {
    width: 13px;
    height: 13px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.4);
    background-clip: padding-box;
    border: 3px solid transparent;
    border-radius: 7px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-track:hover {
    background-color: #f8fafc;
  }
}
.ghost {
  width: 100%;
  height: 0;
  overflow: hidden;
  border: 2px solid #1989fa !important;
  min-height: 0 !important;
  .container_wrapper {
    padding: 0 !important;
    display: none !important;
  }
}
.ghost2 {
  width: 100%;
  overflow: hidden;
  border: 2px solid #1989fa !important;
}
.drag_wrapper {
  width: 100%;
}
.container_wrapper.active {
  .form_widget_item {
    padding: 10px 0;
    box-sizing: border-box;
  }
}
.form_mode {
  .drag_wrapper {
    min-height: 0 !important;
    border: none !important;
  }
  .container_wrapper {
    border: none !important;
  }
  .widget_item {
    margin: 0 !important;
  }
}
.config_wrap {
  padding: 0 10px 10px;
  box-sizing: border-box;
  .title {
    font-size: 14px;
    color: #333;
    padding: 0 10px 10px;
    box-sizing: border-box;
    font-style: italic;
    font-weight: bold;
    border-bottom: 1px solid #2468f2;
    margin-bottom: 20px;
    margin-top: 10px;
    bottom: border-box;
  }
  .item {
    display: flex;
    align-items: center;
    bottom: border-box;
    margin-bottom: 10px;
    .lab {
      width: 90px;
      text-align: left;
      margin-right: 10px;
      font-size: 13px;
      color: #333333;
    }
    .con {
      flex: 1;
    }
  }
  .el-select {
    width: 100%;
  }
}
.widget_hide {
  position: relative;
  &::after {
    position: absolute;
    content: "组件隐藏";
    width: 100%;
    height: 100%;
    left: 0;
    border-radius: 4px;
    top: 0;
    z-index: 1;
    background: rgba($color: #000000, $alpha: 0.4);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
}
.widget_item_wrap {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  .lab {
    flex: 0 0 70px;
    margin-right: 10px;
    font-size: 14px;
    color: #333333;
    font-weight: bold;
  }
  .required::before {
    color: #f56c6c;
    content: "*";
    display: inline-block;
    margin-right: 4px;
  }
  .con {
    flex: 1;
  }
}
.widget_item_wrap_top {
  display: block !important;
  .lab {
    text-align: left;
    margin-bottom: 8px;
  }
}
.sun_form_detail_item {
  font-size: 14px;
  color: #666666;
  display: inline-block;
}
</style>