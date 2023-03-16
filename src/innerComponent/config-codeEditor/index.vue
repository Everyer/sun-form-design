<template>
  <div class="sy_wrap">
    <div class="item">
      <div class="lab">语言</div>
      <div class="con">
        <el-select size="mini" v-model="designer.chosenWidget.props.lang" placeholder="请选择">
          <el-option label="javascript" value="javascript"></el-option>
          <el-option label="html" value="html"></el-option>
          <el-option label="css" value="css"></el-option>
        </el-select>
      </div>
    </div>
    <div class="item">
        <div class="lab">高度</div>
        <div class="con">
          <el-input v-model="designer.chosenWidget.props.height" size="mini"></el-input>
        </div>
      </div>
    <div class="item">
      <div class="lab">是否必填</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.required"></el-switch>
      </div>
    </div>
    <div class="item">
      <div class="lab">是否只读</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.readonly"></el-switch>
      </div>
    </div>
    <div class="item">
      <div class="lab">是否隐藏</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.hide"></el-switch>
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
  name: "config-codeEditor",
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