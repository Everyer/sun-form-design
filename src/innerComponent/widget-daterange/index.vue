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
          v-model="daterangeValue"
          :type="widget.props.type"
          :range-separator="widget.props.rangeSeparator"
          :size="widget.props.size"
          :editable="false"
          :placeholder="widget.props.placeholder"
          :format="widget.props.format"
          :value-format="widget.props.valueFormat"
        ></el-date-picker>
        <span class="sun_form_detail_item" v-else>{{widget.props.value}}</span>
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
  name: "widget-daterange",
  data() {
    return {
      that: this,
      daterangeValue: []
    };
  },
  methods: {
    eventHandle(value, type) {
      if (type == "onChange") {
        if (value) {
          this.widget.props.value = this.daterangeValue.join(
            this.widget.props.rangeSeparator
          );
        } else {
          this.widget.props.value = "";
        }
        this.$emit("change", this.widget.props.value);
      }
      this.designer.eventHandle(this.widget.props.value, type, this.widget);
    }
  },
  watch: {
    daterangeValue(val) {
      if (val.length == 0) {
        this.widget.props.value = "";
      } else {
        this.widget.props.value = val.join(this.widget.props.rangeSeparator);
      }
      this.$emit("change", this.widget.props.value);
    },
    value(val) {
      if (val) {
        this.daterangeValue = val.split(this.widget.props.rangeSeparator);
      } else {
        this.daterangeValue = [];
      }
    },
    "widget.props.value"(val) {
      if (this.widget.parentType) {
        return;
      }
      if (val) {
        this.daterangeValue = val.split(this.widget.props.rangeSeparator);
      } else {
        this.daterangeValue = [];
      }
    }
  },
  created() {
    if (this.widget.parentType) {
      if (
        this.value &&
        typeof this.value == "string" &&
        this.value.includes(this.widget.props.rangeSeparator)
      ) {
        this.daterangeValue = this.value.split(
          this.widget.props.rangeSeparator
        );
      }
    } else {
      var val = this.widget.props.value;
      if (!val) {
        this.daterangeValue = [];
        return;
      }
      this.daterangeValue = val.split(this.widget.props.rangeSeparator);
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