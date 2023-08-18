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
      <div class="lab">最多可选</div>
      <div class="con">
        <el-input-number size="mini" v-model="designer.chosenWidget.props.multipleLimit"  :min="0" ></el-input-number>
      </div>
    </div>
    <div class="item">
      <div class="lab">隐藏多选</div>
      <div class="con">
        <el-switch  v-model="designer.chosenWidget.props.collapseTags"></el-switch>
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
    <div class="item">
      <div class="lab">是否可清除</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.clearable"></el-switch>
      </div>
    </div>
    <CommonJsonListEdit type="multi" @changeValue="changeValue" v-model="designer.chosenWidget.props.list"></CommonJsonListEdit>
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
  name: "config-selects",
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