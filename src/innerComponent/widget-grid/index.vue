<template>
  <container-wrapper
    :class="'grid_wrap sun_form_theme_'+designer.theme"
    :widget="widget"
    :designer="designer"
    :parentList="parentList"
    v-loading="loading"
  >
    <design-form-wrapper :designer="designer">
      <draggable
        :list="widget.widgetList"
        v-bind="{group:'dragGroup', ghostClass: 'ghost',animation: 300}"
        class="drag_wrapper sun_form_grid"
        handle=".drag-handler"
        :disabled="designer.formMode"
      >
        <div
          class="widget_item"
          :style="{width:4.16667*item.props.width+'%'}"
          v-for="(item, index) in widget.widgetList"
          :key="index"
        >
          <component
            :parent-list="widget.widgetList"
            :is="'widget-'+item.type"
            :widget="item"
            :key="item.id"
            :designer="designer"
          ></component>
        </div>
      </draggable>
    </design-form-wrapper>
    <form-mode-wrapper :designer="designer">
      <draggable
        :list="widget.widgetList"
        v-bind="{group:'dragGroup', ghostClass: 'ghost',animation: 300}"
        class="drag_wrapper sun_form_grid"
        :style="widget.props.hideButton?'border-bottom:1px solid #f0f0f0 !important':''"
        handle=".drag-handler"
        :disabled="designer.formMode"
      >
        <div
          v-if="!item.props.hide"
          class="widget_item"
          :style="{width:4.16667*item.props.width+'%'}"
          v-for="(item, index) in widget.widgetList"
          :key="index"
        >
          <component
            :parent-list="widget.widgetList"
            :is="'widget-'+item.type"
            :widget="item"
            :key="item.id"
            :designer="designer"
          ></component>
        </div>
      </draggable>
    </form-mode-wrapper>
    <form-mode-wrapper :designer="designer" v-if="!widget.props.hideButton">
      <div
        class="grid_btn_wrap"
        :style="widget.props.formType=='Detail'?`padding:0`:`padding:10px`"
      >
        <div class="btn_item_wrap" v-if="widget.props.formType!='Detail'">
          <el-button size="small" icon="el-icon-refresh" @click="reset">重置</el-button>
          <el-button
            size="small"
            type="primary"
            icon="el-icon-check"
            :loading="loading"
            @click="submit"
          >提交</el-button>
        </div>
      </div>
    </form-mode-wrapper>
  </container-wrapper>
</template>

<script>
import Draggable from "vuedraggable";
export default {
  components: { Draggable },
  props: {
    widget: {
      type: Object,
      default: () => {
        return {};
      }
    },
    designer: {
      type: Object,
      default: () => {
        return {};
      }
    },
    parentList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  name: "widget-grid",
  data() {
    return {
      that: this,
      loading: false,
      loadingWrap: false
    };
  },
  watch: {
    "widget.props.formType": {
      handler(val) {
        var isDetail = val == "Detail";
        var find = widgetList => {
          for (var i = 0; i < widgetList.length; i++) {
            var item = widgetList[i];
            if (item.props.hasOwnProperty("isDetail")) {
              this.$set(item.props, "isDetail", isDetail);
            }
            if (item && item.widgetList && item.widgetList.length > 0) {
              find(item.widgetList);
            }
          }
        };
        find(this.widget.widgetList);
      },
      immediate: true
    }
  },
  methods: {
    setFormType(type) {
      this.widget.props.formType = type;
    },
    getFormType() {
      return this.widget.props.formType;
    },
    getDetail() {
      var w = this.widget;
      var apiSet = w.props["apiSetDetail"];
      if (!apiSet.apiurl) {
        return;
      }
      var method = apiSet.method;
      var param = {};
      apiSet.params.forEach(item => {
        if (
          typeof item.value == "string" &&
          item.value.includes("${") &&
          item.value.includes("}")
        ) {
          var funStr = item.value.replace("${", "").replace("}", "");
          var fun = new Function("self", "app", "return " + funStr);
          param[item.label] = fun(this, this.designer);
        } else {
          param[item.label] = item.value;
        }
      });
      if (apiSet.contentType == "FormData") {
        if (method == "post" || method == "put" || method == "patch") {
          method += "FormData";
        }
      }
      if (apiSet.beforeSend) {
        var fun = new Function("param", "self", "app", apiSet.beforeSend);
        let paramData = this.$utils.clone(param, true);
        var newParam = fun(paramData, this, this.designer);
        if (newParam && typeof newParam == "object") {
          param = newParam;
        }
      }
      if (!apiSet.apiurl) {
        return;
      }
      this.designer.$http[method](apiSet.apiurl, param)
        .then(res => {
          if (!apiSet.dataFormat) {
            if (res.success || res.code == "0") {
              this.inputData(res.data || res.datas);
            } else {
              this.designer.$message.error(res.msg);
            }
          } else {
            var fun = new Function("res", "self", "app", apiSet.dataFormat);
            var d = fun(res, this, this.designer);
          }
        })
        .catch(err => {});
    },
    inputData(obj) {
      var findForm = widgetList => {
        for (var i = 0; i < widgetList.length; i++) {
          var item = widgetList[i];
          if (item.isForm) {
            this.$set(item.props, "value", obj[item.props.zdname]);
          }
          if (item.widgetList && item.widgetList.length) {
            findForm(item.widgetList);
          }
        }
      };
      findForm(this.widget.widgetList);
    },
    submit() {
      var result = this.getResult();
      if (result === false) {
        return this.$message.warning("必填项不能为空");
      }
      var w = this.widget;
      var apiSet = w.props["apiSet" + w.props.formType];
      var method = apiSet.method;
      var param = result;
      apiSet.params.forEach(item => {
        if (
          typeof item.value == "string" &&
          item.value.includes("${") &&
          item.value.includes("}")
        ) {
          var funStr = item.value.replace("${", "").replace("}", "");
          var fun = new Function("self", "app", "return " + funStr);
          param[item.label] = fun(this, this.designer);
        } else {
          param[item.label] = item.value;
        }
      });
      if (apiSet.contentType == "FormData") {
        if (method == "post" || method == "put" || method == "patch") {
          method += "FormData";
        }
      }
      if (apiSet.beforeSend) {
        var fun = new Function("param", "self", "app", apiSet.beforeSend);
        let paramData = this.$utils.clone(param, true);
        var newParam = fun(paramData, this, this.designer);
        if (newParam && typeof newParam == "object") {
          param = newParam;
        }
      }
      if (!apiSet.apiurl) {
        return;
      }
      this.loading = true;
      this.designer.$http[method](apiSet.apiurl, param)
        .then(res => {
          if (!apiSet.dataFormat) {
            if (res.success || res.code == "0") {
              this.designer.$message.success("提交成功");
            } else {
              this.designer.$message.error(res.msg);
            }
          } else {
            var fun = new Function("res", "self", "app", apiSet.dataFormat);
            var d = fun(res, this, this.designer);
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    reset() {
      this.designer.resetForm(this.widget.id, this.widget.widgetList);
    },
    isTableListFormItemRequired(tableList, tableValue) {
      var validRequired = true;

      var find = tableList => {
        for (var i = 0; i < tableList.length; i++) {
          var item = tableList[i];
          if (item.isForm && item.props.zdname) {
            if (
              (item.props.value === null ||
                item.props.value === "" ||
                item.props.value === [] ||
                item.props.value === undefined) &&
              item.props.required
            ) {
              validRequired = false;
            }
          }
          if (
            item.type == "datatable" &&
            item.props.tableConfig.tableList.length > 0
          ) {
            find(item.props.tableConfig.tableList);
          }
        }
      };
      find(tableList);
      return validRequired;
    },
    getResult() {
      var result = {};
      var validRequired = true;
      var find = list => {
        list.forEach(item => {
          if (item.isForm && item.props.zdname) {
            result[item.props.zdname] = item.props.value;
            if (
              (item.props.value === null ||
                item.props.value === "" ||
                item.props.value === [] ||
                item.props.value === undefined) &&
              item.props.required
            ) {
              validRequired = false;
            }
            if (item.type == "datatable") {
              var tableValue = item.props.value;
              var status = this.isTableListFormItemRequired(
                item.props.tableConfig.tableList,
                tableValue
              );
              if (!status) {
                validRequired = false;
              }
            }
          }
          if (item.widgetList && item.widgetList.length > 0) {
            find(item.widgetList);
          }
        });
      };
      find(this.widget.widgetList);
      if (!validRequired) {
        return validRequired;
      } else {
        return result;
      }
    }
  },
  created() {
    this.designer.eventHandle(null, "onCreated", this.widget, this);
  },
  mounted() {
    this.designer.eventHandle(null, "onMounted", this.widget, this);
    if (this.widget.props.formType !== "Create" && this.designer.formMode) {
      this.getDetail();
    }
  }
};
</script>

<style scoped lang="scss">
.grid_wrap {
  flex-wrap: wrap;
}
.widget_item {
  box-sizing: border-box;
  width: 100%;
  margin: 0px 0;
  min-height: 50px;
}
.drag_wrapper {
  min-height: 50px;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
.grid_btn_wrap {
  display: flex;
  padding: 10px 10px;
  flex-direction: row-reverse;
  border: 1px solid #f0f0f0;
  background: #fafafa;
  border-radius: 0px 0px 5px 5px;
}
</style>