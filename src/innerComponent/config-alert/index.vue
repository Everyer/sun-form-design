<template>
  <div class="sy_wrap">
    <div class="item">
      <div class="lab">警告类型</div>
      <div class="con">
        <el-select size="mini" v-model="designer.chosenWidget.props.type" placeholder="请选择">
          <el-option label="成功按钮" value="success"></el-option>
          <el-option label="信息按钮" value="info"></el-option>
          <el-option label="警告按钮" value="warning"></el-option>
          <el-option label="危险按钮" value="error"></el-option>
        </el-select>
      </div>
    </div>
    <div class="item">
      <div class="lab">主题类型</div>
      <div class="con">
        <el-select size="mini" v-model="designer.chosenWidget.props.effect" placeholder="请选择">
          <el-option label="light" value="light"></el-option>
          <el-option label="dark" value="dark"></el-option>
        </el-select>
      </div>
    </div>
    
    <div class="item">
      <div class="lab">描述文字</div>
      <div class="con">
        <el-input v-model="designer.chosenWidget.props.description" size="mini"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="lab">是否隐藏</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.hide"></el-switch>
      </div>
    </div>
    <div class="item">
      <div class="lab">是否有图标</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.showIcon"></el-switch>
      </div>
    </div>
    <div class="item">
      <div class="lab">是否居中</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.center"></el-switch>
      </div>
    </div>
    <div class="item">
      <div class="lab">是否可关闭</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.closable"></el-switch>
      </div>
    </div>
    <div class="item">
      <div class="lab">关闭文字</div>
      <div class="con">
        <el-input v-model="designer.chosenWidget.props.closeText" size="mini"></el-input>
      </div>
    </div>
    <!-- <div class="item">
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
      <div class="lab">按钮类型</div>
      <div class="con">
        <el-select size="mini" v-model="designer.chosenWidget.props.type" placeholder="请选择">
          <el-option label="主要按钮" value="primary"></el-option>
          <el-option label="成功按钮" value="success"></el-option>
          <el-option label="信息按钮" value="info"></el-option>
          <el-option label="警告按钮" value="warning"></el-option>
          <el-option label="危险按钮" value="danger"></el-option>
        </el-select>
      </div>
    </div>
    <div class="item">
      <div class="lab">按钮文字</div>
      <div class="con">
        <el-input v-model="designer.chosenWidget.props.buttonText" size="mini"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="lab">按钮图标</div>
      <div class="con">
        <common-icon-setting v-model="designer.chosenWidget.props.icon"></common-icon-setting>
      </div>
    </div>
    <div class="item">
      <div class="lab">是否隐藏</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.hide"></el-switch>
      </div>
    </div>
    <div class="item">
      <div class="lab">朴素按钮</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.isPlain"></el-switch>
      </div>
    </div>
    <div class="item">
      <div class="lab">圆角按钮</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.isRound"></el-switch>
      </div>
    </div>
    <div class="item">
      <div class="lab">是否禁用</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.disabled"></el-switch>
      </div>
    </div>-->
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
  name: "config-alert",
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