<template>
  <div class="sy_wrap">
    <div class="item">
      <div class="lab">弹窗标题</div>
      <div class="con">
        <el-input v-model="designer.chosenWidget.props.title" placeholder="请填写标题" size="mini"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="lab">弹窗宽度</div>
      <div class="con">
        <el-input v-model="designer.chosenWidget.props.modalWidth" placeholder="请填写标题" size="mini"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="lab">弹窗高度</div>
      <div class="con">
        <el-input v-model="designer.chosenWidget.props.modalHeight" placeholder="请填写标题" size="mini"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="lab">是否有按钮栏</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.hasFooter"></el-switch>
      </div>
    </div>
    <div class="item">
      <div class="lab">是否隐藏确定</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.hideConfirm"></el-switch>
      </div>
    </div>
    <div class="item">
      <div class="lab">是否隐藏取消</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.hideCancel"></el-switch>
      </div>
    </div>
    <CommonJsonListEdit title="按钮生成（按钮名字/按钮key）" v-model="designer.chosenWidget.props.list"></CommonJsonListEdit>
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
  name: "config-modal",
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