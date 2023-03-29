<template>
  <div class="sy_wrap">
    <div class="item">
      <div class="lab">组件主题</div>
      <div class="con">
        <el-select size="mini" v-model="designer.chosenWidget.props.theme" placeholder="请选择">
          <el-option label="浅色" value="oxide"></el-option>
          <el-option label="深色" value="oxide-dark"></el-option>
        </el-select>
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
    <div class="item">
      <div class="lab">上传字段</div>
      <div class="con">
        <el-input v-model="designer.chosenWidget.props.fileField" size="mini"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="lab">文件URL字段</div>
      <div class="con">
        <el-input
          v-model="designer.chosenWidget.props.fileUrlField"
          placeholder="请填写返回文件地址字段"
          size="mini"
        ></el-input>
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
  name: "config-editor",
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