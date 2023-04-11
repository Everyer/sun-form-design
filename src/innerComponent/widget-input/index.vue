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
        <el-input
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
        <span class="sun_form_detail_item" v-else>{{widgetValue}}</span>
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
  name: "widget-input",
  data() {
    return {
      that: this,
      widgetValue: null
    };
  },
  methods: {
    changeHandle(val) {
      if (this.widget.props.type == "number") {
        this.widgetValue = Number(val);
      }
      val = Number(val);
      this.designer.eventHandle(val, "onChange", this.widget, this);
    }
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
      if (this.widget.parentType) {
        return;
      }
      this.widgetValue = val;
    }
  },
  created() {
    if (this.widget.parentType) {
      this.widgetValue = this.value;
    } else {
      this.widgetValue = this.widget.props.value;
    }
    this.designer.eventHandle(null, "onCreated", this.widget, this);
  },
  mounted() {
    this.designer.eventHandle(null, "onMounted", this.widget, this);
  }
};
</script>

<style scoped lang="scss">
</style>