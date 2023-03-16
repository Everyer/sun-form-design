<template>
  <div class="sy_wrap">
    <div class="item">
      <div class="lab">组件尺寸</div>
      <div class="con">
        <el-select size="mini" v-model="designer.chosenWidget.props.size" placeholder="请选择">
          <el-option label="large" value="large"></el-option>
          <el-option label="medium" value="medium"></el-option>
          <el-option label="small" value="small"></el-option>
          <el-option label="mini" value="mini"></el-option>
        </el-select>
      </div>
    </div>
    <div class="item">
      <div class="lab">是否块状</div>
      <div class="con">
        <el-switch @change="changeBlock" v-model="designer.chosenWidget.props.isBlock"></el-switch>
      </div>
    </div>
    <div class="item">
      <div class="lab">是否按钮</div>
      <div class="con">
        <el-switch @change="changeButton" v-model="designer.chosenWidget.props.isButton"></el-switch>
      </div>
    </div>
    <div class="item">
      <div class="lab">是否必填</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.required"></el-switch>
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

    <CommonJsonListEdit @changeValue="changeValue" v-model="designer.chosenWidget.props.list"></CommonJsonListEdit>
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
  name: "config-radio",
  data() {
    return {};
  },
  methods: {
    changeBlock(val) {
      if (val) {
        this.designer.chosenWidget.props.isButton = false;
      }
    },
    changeButton(val) {
      if (val) {
        this.designer.chosenWidget.props.isBlock = false;
      }
    },
    changeValue(value) {
      this.designer.chosenWidget.props.value = value;
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped lang="scss">
</style>