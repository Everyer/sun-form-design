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
        <el-select
          v-if="!widget.props.isDetail"
          @change="eventHandle(table||$event,'onChange',widget,that)"
          @focus="designer.eventHandle(table||$event,'onFocus',widget, that)"
          @blur="designer.eventHandle(table||$event,'onBlur',widget, that)"
          class="sy_select"
          :size="widget.props.size"
          :disabled="widget.props.disabled"
          :multiple-limit="widget.props.multipleLimit"
          :placeholder="widget.props.placeholder"
          :collapse-tags="widget.props.collapseTags"
          :clearable="widget.props.clearable"
          v-model="checkboxValue"
          multiple
          filterable
          placeholder="请选择"
          :key="new Date().getTime()"
        >
          <el-option
            v-for="(item, index) in widget.props.list"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span
          class="sun_form_detail_item"
          v-else
        >{{designer.getDetailByList(checkboxValue,widget.props.list)}}</span>
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
    table: {
      type: Object,
      default: () => {
        return null;
      }
    },
    value: {
      type: [String, Number, Boolean, Array, Object],
      default: null
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
  name: "widget-selects",
  data() {
    return {
      that: this,
      checkboxValue: []
    };
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
    },
    eventHandle(value, type) {
      // if (type == "onChange") {
      this.widget.props.value = this.checkboxValue.join(",");
      this.$emit("change", this.widget.props.value);
      // }
      this.designer.eventHandle(
        this.widget.props.value,
        type,
        this.widget,
        this
      );
    }
  },
  watch: {
    value(val) {
      if (val && val !== "") {
        this.checkboxValue = val.split(",");
      } else {
        this.checkboxValue = [];
      }
    },
    "widget.props.value"(val) {
      if (this.widget.parentType) {
        return;
      }
      if (val && val !== "") {
        this.checkboxValue = val.split(",");
      } else {
        this.checkboxValue = [];
      }
    }
  },
  created() {
    if (this.widget.parentType) {
      if (this.value && this.value !== "") {
        if (typeof this.value == "string") {
          this.checkboxValue = this.value.split(",");
        }
      }
    } else {
      if (this.widget.props.value && this.widget.props.value !== "") {
        this.checkboxValue = this.widget.props.value.split(",");
      }
    }
    this.designer.eventHandle(null, "onCreated", this.widget, this);
    if (this.designer.formMode) {
      this.getDetail();
    }
  },
  mounted() {
    this.designer.eventHandle(null, "onMounted", this.widget, this);
  }
};
</script>

<style scoped lang="scss">
.sy_select {
  width: 100%;
}
</style>