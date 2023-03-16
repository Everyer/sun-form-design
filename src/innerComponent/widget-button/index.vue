<template>
  <container-wrapper :widget="widget" :designer="designer" :parentList="parentList">
    <div
      class="widget_item_wrap"
      :class="{widget_item_wrap_top:widget.props.labelPosition=='top',widget_hide:widget.props.hide}"
    >
      <div
        class="lab"
        v-show="false"
        :class="{required:widget.props.required}"
        :style="{width:widget.props.labelWidth,textAlign:widget.props.labelAlign,flex:`0 0 ${widget.props.labelWidth}`}"
      >{{widget.props.label}}</div>
      <div class="con">
        <el-button
          @click="designer.eventHandle($event,'onClick',widget,that)"
          :type="widget.props.type"
          :size="widget.props.size"
          :icon="widget.props.icon"
          :plain="widget.props.isPlain"
          :round="widget.props.isRound"
          :disabled="widget.props.disabled"
        >{{widget.props.buttonText}}</el-button>
      </div>
    </div>
  </container-wrapper>
</template>

<script>
export default {
  components: {},
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
  name: "widget-button",
  data() {
    return {
      that: this
    };
  },
  methods: {},
  created() {
    this.designer.eventHandle(null, "onCreated", this.widget, this);
  },
  mounted() {
    this.designer.eventHandle(null, "onMounted", this.widget, this);
  }
};
</script>

<style scoped lang="scss">
</style>