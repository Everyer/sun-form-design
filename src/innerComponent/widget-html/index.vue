<template>
  <container-wrapper :widget="widget" :designer="designer" :parentList="parentList">
    <div
      class="widget_item_wrap"
      :class="{widget_item_wrap_top:widget.props.labelPosition=='top',widget_hide:widget.props.hide}"
    >
      <div class="con">
        <div class="html_preview_wrap" v-html="widget.props.value"></div>
        <design-form-wrapper :designer="designer">
          <el-divider>代码预览</el-divider>
          <div class="html_edit_wrap">
            <common-code-editor lang="html" ref="editor" v-model="widget.props.value"></common-code-editor>
          </div>
        </design-form-wrapper>
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
  name: "widget-html",
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
.con {
  .html_preview_wrap {
    white-space: normal;
  }
  .html_edit_wrap {
    height: 300px;
  }
}
</style>