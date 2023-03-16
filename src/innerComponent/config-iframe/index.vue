<template>
  <div class="sy_wrap">
    <div class="item">
      <div class="lab">高度</div>
      <div class="con">
        <el-input v-model="designer.chosenWidget.props.height" size="mini"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="lab">地址</div>
      <div class="con">
        <el-input placeholder="iframe的src的值" v-model="designer.chosenWidget.props.src" size="mini"></el-input>
      </div>
    </div>
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
  name: "config-iframe",
  data() {
    return {};
  },
  methods: {
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