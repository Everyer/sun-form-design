<template>
  <div class="sy_wrap">
    <div class="item">
      <div class="lab">最大分值</div>
      <div class="con">
        <el-input v-model="designer.chosenWidget.props.max" size="mini"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="lab">是否允许半选</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.allowHalf"></el-switch>
      </div>
    </div>
    <div class="item">
      <div class="lab">是否显示分数</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.showScore"></el-switch>
      </div>
    </div>
    <div class="item">
      <div class="lab">是否隐藏</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.hide"></el-switch>
      </div>
    </div>
    <div class="item">
      <div class="lab">是否禁用</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.disabled"></el-switch>
      </div>
    </div>
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
  name: "config-rate",
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