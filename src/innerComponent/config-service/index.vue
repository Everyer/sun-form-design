<template>
  <div class="sy_wrap">
    <div class="item">
      <div class="lab">组件JSON</div>
      <div class="con">
        <el-button
          icon="el-icon-edit"
          :type="designer.chosenWidget.props.serviceJson?'primary':'info'"
          plain
          size="mini"
          round
          @click="showEditor=true"
        >编写JSON</el-button>
      </div>
    </div>
    <vxe-modal
      v-model="showEditor"
      id="model4"
      width="1200"
      height="600"
      show-footer
      :transfer="true"
      :destroy-on-close="true"
    >
      <template #title>
        <span>组件JSON数据</span>
      </template>
      <template #default>
        <div class="editor_wrap sy_form_show_wrap">
          <common-code-editor ref="editor" v-model="designer.chosenWidget.props.serviceJson"></common-code-editor>
        </div>
      </template>
      <template #footer>
        <el-button size="mini" icon="el-icon-close" @click="showEditor=false">取消</el-button>
        <el-button size="mini" icon="el-icon-check" @click="format">格式化</el-button>
      </template>
    </vxe-modal>
  </div>
</template>

<script>
import { js_beautify } from "../../util/jsformat";

export default {
  props: {
    designer: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: {},
  name: "config-service",
  data() {
    return {
      showEditor: false
    };
  },
  methods: {
    format() {
      this.designer.chosenWidget.props.serviceJson = js_beautify(this.designer.chosenWidget.props.serviceJson);
    },
    hasEvent(type) {
      return this.designer.chosenWidget.props.hasOwnProperty(type);
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped lang="scss">
.sy_form_show_wrap {
  height: 100%;
}
</style>