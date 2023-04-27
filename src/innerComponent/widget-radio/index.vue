<template>
  <container-wrapper :widget="widget" :designer="designer" :parentList="parentList">
    <div
      class="widget_item_wrap"
      :class="{widget_item_wrap_top:widget.props.labelPosition=='top',widget_hide:widget.props.hide}"
    >
      <div
        class="lab"
        :class="{required:widget.props.required}"
        :style="{width:widget.props.labelWidth,textAlign:widget.props.labelAlign,flex:`0 0 ${widget.props.labelWidth}`}"
      >{{widget.props.label}}</div>
      <div class="con">
        <el-radio-group
          v-if="!widget.props.isDetail"
          @change="designer.eventHandle(table||$event,'onChange',widget,that)"
          v-model="widgetValue"
          :disabled="widget.props.disabled"
          :size="widget.props.size"
        >
          <el-radio
            :style="widget.props.isBlock?'display:block;padding:5px 0;':'display:inline-block'"
            v-if="!widget.props.isButton"
            v-for="(item, index) in widget.props.list"
            :key="index"
            :label="item.value"
          >{{item.label}}</el-radio>
          <el-radio-button
            v-if="widget.props.isButton"
            v-for="(item, index) in widget.props.list"
            :key="index"
            :label="item.value"
          >{{item.label}}</el-radio-button>
        </el-radio-group>
        <span class="sun_form_detail_item" v-else>
          {{designer.getDetailByList(widgetValue,widget.props.list)}}
        </span>
      </div>
    </div>
  </container-wrapper>
</template>

<script>
export default {
  components: {},
  model: {
    event: "change"
  },
  props: {
    value: {
      type: [String, Number, Boolean, Array, Object],
      default: null
    },
    table: {
      type: Object,
      default: () => {
        return null;
      }
    },
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
  name: "widget-radio",
  data() {
    return {
      that: this,
      widgetValue: null
    };
  },
  watch: {
    widgetValue(val) {
      this.$emit("change", val);
      this.widget.props.value = val;
    },
    value(val) {
      this.widgetValue = val;
    },
    "widget.props.value"(val) {
      if(this.widget.parentType){
        return
      }
      this.widgetValue = val;
    }
  },
  methods: {
    setList(obj) {
      this.widget.props.list = obj;
    },
    getDetail() {
      var w = this.widget;
      var apiSet = w.props.apiSet;
      if (!apiSet.apiurl) {
        return;
      }
      var method = apiSet.method;
      var param = {};
      apiSet.params.forEach(item => {
        if (item.value.includes("${") && item.value.includes("}")) {
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
        let paramData=this.$utils.clone(param, true)
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
              if (apiSet.labelField && apiSet.valueField) {
                this.setList(
                  res.data.map(item => {
                    return {
                      label: item[apiSet.labelField],
                      value: item[apiSet.valueField]
                    };
                  })
                );
              }
            } else {
              this.designer.$message.error(res.msg);
            }
          } else {
            var fun = new Function("res", "self", "app", apiSet.dataFormat);
            var d = fun(res, this, this.designer);
          }
        })
        .catch(err => {});
    }
  },
  created() {
    if (this.widget.parentType) {
      this.widgetValue = this.value;
    } else {
      this.widgetValue = this.widget.props.value;
    }
    this.designer.eventHandle(null, "onCreated", this.widget, this);
    if(this.designer.formMode){
      this.getDetail();
    }
  },
  mounted() {
    this.designer.eventHandle(null, "onMounted", this.widget, this);
  }
};
</script>

<style scoped lang="scss">
</style>