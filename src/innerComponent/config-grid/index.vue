<template>
  <div class="sy_wrap">
    <div class="item">
      <div class="lab">表单类型</div>
      <div class="con">
        <el-select size="mini" v-model="designer.chosenWidget.props.formType" placeholder="请选择">
          <el-option label="Create" value="Create"></el-option>
          <el-option label="Update" value="Update"></el-option>
          <el-option label="Detail" value="Detail"></el-option>
        </el-select>
      </div>
    </div>
    <div class="item">
      <div class="lab">新增接口配置</div>
      <div class="con">
        <common-http-set :designer="designer" v-model="designer.chosenWidget.props.apiSetCreate"></common-http-set>
      </div>
    </div>
    <div class="item">
      <div class="lab">修改接口配置</div>
      <div class="con">
        <common-http-set :designer="designer" v-model="designer.chosenWidget.props.apiSetUpdate"></common-http-set>
      </div>
    </div>
    <div class="item">
      <div class="lab">详情接口配置</div>
      <div class="con">
        <common-http-set :designer="designer" v-model="designer.chosenWidget.props.apiSetDetail"></common-http-set>
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
  name: "config-grid",
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