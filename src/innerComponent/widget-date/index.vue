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
        <el-date-picker
          v-if="!widget.props.isDetail"
          @change="designer.eventHandle(table||$event,'onChange',widget,that)"
          @focus="designer.eventHandle(table||$event,'onFocus',widget, that)"
          @blur="designer.eventHandle(table||$event,'onBlur',widget, that)"
          class="sy_date"
          v-model="widgetValue"
          :size="widget.props.size"
          :type="widget.props.type"
          :editable="false"
          :placeholder="widget.props.placeholder"
          :format="widget.props.format"
          :value-format="widget.props.valueFormat"
        ></el-date-picker>
        <span class="sun_form_detail_item" v-else>
          {{widgetValue}}
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
  name: "widget-date",
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
      if (isNaN(this.value) && !isNaN(Date.parse(this.value))) {
        this.widgetValue = this.value;
      }
    } else {
      this.widgetValue = this.widget.props.value;
      if (this.widget.props.defaultNow) {
        this.widget.props.value = this.$utils.toDateString(
          new Date(),
          this.widget.props.valueFormat
        );
      }
    }
    this.designer.eventHandle(null, "onCreated", this.widget, this);
  },
  mounted() {
    this.designer.eventHandle(null, "onMounted", this.widget, this);
  }
};
</script>

<style scoped lang="scss">
.sy_date {
  width: 100% !important;
}
</style>