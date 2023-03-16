<template>
  <container-wrapper :widget="widget" :designer="designer" :parentList="parentList">
    <div
      class="widget_item_wrap sun_form_title"
      :class="{widget_item_wrap_top:widget.props.labelPosition=='top',widget_hide:widget.props.hide}"
    >
      <div class="con">
        <div class="w_title_wrap">{{widget.props.value}}</div>
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
  name: "widget-title",
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
.w_title_wrap {
  color: rgba(26, 26, 26, 1);
  font-size: 16px;
  font-weight: bold;
  padding: 5px 3px;
  position: relative;
  padding-left: 10px !important;
  &::before {
    content: "";
    display: inline-block;
    width: 3px;
    height: 34px;
    background: #409eff;
    margin-right: 5px;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>