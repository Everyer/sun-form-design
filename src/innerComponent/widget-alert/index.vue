<template>
  <container-wrapper :widget="widget" :designer="designer" :parentList="parentList">
    <div
      class="widget_item_wrap"
      :class="{widget_item_wrap_top:widget.props.labelPosition=='top',widget_hide:widget.props.hide}"
    >
      <div class="con">
        <el-alert
          :title="widget.props.value"
          :type="widget.props.type"
          :show-icon="widget.props.showIcon"
          :description="widget.props.description"
          :closable="widget.props.closable"
          :center="widget.props.center"
          :close-text="widget.props.closeText"
          :effect="widget.props.effect"
        ></el-alert>
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
  name: "widget-alert",
  data() {
    return {
      that: this
    };
  },
  methods: {
    setType(val) {
      this.$nextTick(() => {
        this.widget.props.type = val;
      });
    },
    setEffect(val) {
      this.$nextTick(() => {
        this.widget.props.effect = val;
      });
    },
    setCloseText(val) {
      this.$nextTick(() => {
        this.widget.props.closeText = val;
      });
    },
    setCenter(val) {
      this.$nextTick(() => {
        this.widget.props.center = val;
      });
    },
    setClosable(val) {
      this.$nextTick(() => {
        this.widget.props.closable = val;
      });
    },
    setDescription(val) {
      this.$nextTick(() => {
        this.widget.props.description = val;
      });
    }
  },
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