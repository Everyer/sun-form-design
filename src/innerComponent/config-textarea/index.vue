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
      <div class="lab">占位文字</div>
      <div class="con">
        <el-input v-model="designer.chosenWidget.props.placeholder" size="mini"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="lab">最大输入长度</div>
      <div class="con">
        <el-input v-model="designer.chosenWidget.props.maxlength" type="number" size="mini"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="lab">行数</div>
      <div class="con">
        <el-input-number size="mini" v-model="designer.chosenWidget.props.rows" :min="3"></el-input-number>
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
  name: "config-textarea",
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