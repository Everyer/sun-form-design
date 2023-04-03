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
        <el-checkbox-group
          v-if="!widget.props.isDetail"
          :disabled="widget.props.disabled"
          v-model="checkboxValue"
          :size="widget.props.size"
          @change="eventHandle(table||$event,'onChange',widget,that)"
        >
          <el-checkbox
            v-if="!widget.props.isButton"
            :style="widget.props.isBlock?'display:block;padding:5px 0;':'display:inline-block'"
            v-for="(item, index) in widget.props.list"
            :label="item.value"
          >{{item.label}}</el-checkbox>
          <el-checkbox-button
            v-if="widget.props.isButton"
            v-for="(item, index) in widget.props.list"
            :label="item.value"
          >{{item.label}}</el-checkbox-button>
        </el-checkbox-group>
        <span class="sun_form_detail_item" v-else>
          {{designer.getDetailByList(checkboxValue,widget.props.list)}}
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
  name: "widget-checkbox",
  data() {
    return {
      that: this,
      checkboxValue: []
    };
  },
  methods: {
    eventHandle(value, type, widget, that) {
      this.widget.props.value = this.checkboxValue.join(",");
      this.$emit("change", this.widget.props.value);
      this.designer.eventHandle(this.widget.props.value, type, widget, that);
    },
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
</style>