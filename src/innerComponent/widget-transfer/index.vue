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
        <el-transfer
          @change="changeValue"
          filterable
          :props="{key:widget.props.propsKey,label:widget.props.propsLabel}"
          :titles="titles"
          v-model="widgetValue"
          :data="widget.props.list"
          @mouseover.native="addHover"
        ></el-transfer>
        <!-- <span class="sun_form_detail_item" v-else>{{widgetValue}}</span> -->
        <!-- <el-input
          v-if="!widget.props.isDetail"
          @change="changeHandle(table||$event)"
          @input="designer.eventHandle(table||$event,'onInput',widget,that)"
          @focus="designer.eventHandle(table||$event,'onFocus',widget, that)"
          @blur="designer.eventHandle(table||$event,'onBlur',widget, that)"
          v-model="widgetValue"
          :disabled="widget.props.disabled"
          :readonly="widget.props.readonly"
          class="sy_inp"
          :size="widget.props.size"
          :style="{width:widget.props.width}"
          :placeholder="widget.props.placeholder"
          :type="widget.props.type||'text'"
        >
          <el-button
            @click="designer.eventHandle(table||widgetValue,'onHandle',widget, that)"
            v-if="widget.props.onHandle "
            slot="append"
            icon="el-icon-copy-document"
          ></el-button>
        </el-input>
        <span class="sun_form_detail_item" v-else>{{widgetValue}}</span>-->
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
  name: "widget-transfer",
  data() {
    return {
      titles: ["备选项", "已选项"],
      that: this,
      widgetValue: []
    };
  },
  methods: {
    addHover(e) {
      const target = e.target;
      if (target.title) return;
      target.title = target.innerText;
    },

    changeValue(val) {
      if (this.widget.props.valueType == "keyArr") {
        this.$emit("change", val);
        this.widget.props.value = val;
      } else if (this.widget.props.valueType == "jsonArr") {
        var chosenList = [];
        this.widget.props.list.forEach(item => {
          if (val.includes(item[this.widget.props.propsKey])) {
            chosenList.push(item);
          }
        });
        this.$emit("change", chosenList);
        this.widget.props.value = chosenList;
      }
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
              this.setList(res.data);
            } else {
              this.designer.$message.error(res.msg);
            }
          } else {
            var fun = new Function("res", "self", "app", apiSet.dataFormat);
            var d = fun(res, this, this.designer);
            this.setList(d);
          }
        })
        .catch(err => {});
    },
    changeHandle(val) {
      if (this.widget.props.type == "number") {
        this.widgetValue = Number(val);
      }
      val = Number(val);
      this.designer.eventHandle(val, "onChange", this.widget, this);
    }
  },
  watch: {
    // widgetValue(val) {
    //   if (val.length) {
    //     if (this.widget.props.valueType == "keyArr") {
    //       this.$emit("change", val);
    //       this.widget.props.value = val;
    //     } else if (this.widget.props.valueType == "jsonArr") {
    //       console.log(222);

    //       var chosenList = [];
    //       this.widget.props.list.forEach(item => {
    //         if (val.includes(item[this.widget.props.propsKey])) {
    //           chosenList.push(item);
    //         }
    //       });
    //       this.$emit("change", chosenList);
    //       this.widget.props.value = chosenList;
    //     }
    //   }
    // },
    value(val) {
      if (this.widget.props.valueType == "keyArr") {
        this.widgetValue = val;
      } else if (this.widget.props.valueType == "jsonArr") {
        this.widgetValue = val.map(e => e[this.widget.props.propsKey]);
      }
    },
    "widget.props.value"(val) {
      if (this.widget.parentType) {
        return;
      }
      if (this.widget.props.valueType == "keyArr") {
        this.widgetValue = val;
      } else if (this.widget.props.valueType == "jsonArr") {
        this.widgetValue = val.map(e => e[this.widget.props.propsKey]);
      }
    }
  },
  created() {
    if (this.widget.parentType) {
      this.widgetValue = this.value;
    } else {
      this.widgetValue = this.widget.props.value;
    }
    this.designer.eventHandle(null, "onCreated", this.widget, this);
    // if (this.designer.formMode) {
    this.getDetail();
    // }
  },
  mounted() {
    this.designer.eventHandle(null, "onMounted", this.widget, this);
  }
};
</script>

<style scoped lang="scss">
</style>