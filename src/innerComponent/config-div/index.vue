<template>
  <div class="sy_wrap">
    <div class="item">
      <div class="lab">容器宽度</div>
      <div class="con">
        <el-input v-model="designer.chosenWidget.props.divWidth" size="mini"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="lab">容器高度</div>
      <div class="con">
        <el-input v-model="designer.chosenWidget.props.divHeight" size="mini"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="lab">是否隐藏</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.hide"></el-switch>
      </div>
    </div>
    <CommonJsonListEdit title="样式设置（例：fontWeight/bold）" v-model="designer.chosenWidget.props.style"></CommonJsonListEdit>
  </div>
</template>

<script>
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
  name: "config-div",
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style scoped lang="scss">
</style>