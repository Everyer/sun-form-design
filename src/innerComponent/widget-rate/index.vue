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
        <el-rate
          @change="designer.eventHandle(table||$event,'onChange',widget,that)"
          :allow-half="widget.props.allowHalf"
          :max="Number(widget.props.max)"
          :disabled="widget.props.disabled||widget.props.isDetail"
          text-color="#ff9900"
          :show-score="widget.props.showScore"
          v-model="widgetValue"
          score-template="{value}"
        ></el-rate>
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
  name: "widget-rate",
  data() {
    return {
      that: this,
      widgetValue: null
    };
  },
  methods: {},
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