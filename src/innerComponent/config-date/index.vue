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
      <div class="lab">显示类型</div>
      <div class="con">
        <el-select size="mini" v-model="designer.chosenWidget.props.type" placeholder="请选择">
          <el-option label="日期" value="date"></el-option>
          <el-option label="年" value="year"></el-option>
          <el-option label="月" value="month"></el-option>
          <el-option label="周" value="week"></el-option>
          <el-option label="日期时间" value="datetime"></el-option>
        </el-select>
      </div>
    </div>
    <div class="item">
      <div class="lab">显示格式</div>
      <div class="con">
        <el-select size="mini" v-model="designer.chosenWidget.props.format" placeholder="请选择">
          <el-option label="yyyy" value="yyyy"></el-option>
          <el-option label="yyyy-MM" value="yyyy-MM"></el-option>
          <el-option label="yyyy-MM-dd" value="yyyy-MM-dd"></el-option>
          <el-option label="yyyy/MM/dd" value="yyyy/MM/dd"></el-option>
          <el-option label="yyyy年MM月dd" value="yyyy年MM月dd"></el-option>
          <el-option label="yyyy-MM-dd HH:mm:ss" value="yyyy-MM-dd HH:mm:ss"></el-option>
          <el-option label="yyyy/MM/dd HH:mm:ss" value="yyyy/MM/dd HH:mm:ss"></el-option>
          <el-option label="yyyy-MM-dd hh:mm:ss" value="yyyy-MM-dd hh:mm:ss"></el-option>
          <el-option label="yyyy/MM/dd hh:mm:ss" value="yyyy/MM/dd hh:mm:ss"></el-option>
        </el-select>
      </div>
    </div>
    <div class="item">
      <div class="lab">输出格式</div>
      <div class="con">
        <el-select size="mini" v-model="designer.chosenWidget.props.valueFormat" placeholder="请选择">
          <el-option label="yyyy" value="yyyy"></el-option>
          <el-option label="yyyy-MM" value="yyyy-MM"></el-option>
          <el-option label="yyyy-MM-dd" value="yyyy-MM-dd"></el-option>
          <el-option label="yyyy/MM/dd" value="yyyy/MM/dd"></el-option>
          <el-option label="yyyy-MM-dd HH:mm:ss" value="yyyy-MM-dd HH:mm:ss"></el-option>
          <el-option label="yyyy/MM/dd HH:mm:ss" value="yyyy/MM/dd HH:mm:ss"></el-option>
          <el-option label="yyyy-MM-dd hh:mm:ss" value="yyyy-MM-dd hh:mm:ss"></el-option>
          <el-option label="yyyy/MM/dd hh:mm:ss" value="yyyy/MM/dd hh:mm:ss"></el-option>
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
      <div class="lab">默认当前</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.defaultNow"></el-switch>
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
  name: "config-date",
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