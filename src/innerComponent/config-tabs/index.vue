<template>
  <div class="sy_wrap">
    <div class="item">
      <div class="lab">卡片风格</div>
      <div class="con">
        <el-select size="mini" v-model="designer.chosenWidget.props.type" placeholder="请选择">
          <el-option label="card" value="card"></el-option>
          <el-option label="border-card" value="border-card"></el-option>
        </el-select>
      </div>
    </div>
    <div class="item">
      <div class="lab">加载方式</div>
      <div class="con">
        <el-select size="mini" v-model="designer.chosenWidget.props.loadType" placeholder="请选择">
          <el-option label="一次性加载内容" value="loadAll"></el-option>
          <el-option label="切换时加载内容" value="loadOnce"></el-option>
        </el-select>
      </div>
    </div>
    <configTabJson @changeValue="changeValue" v-model="designer.chosenWidget.props.tabs"></configTabJson>
  </div>
</template>

<script>
import configTabJson from "./configTabJson";
export default {
  props: {
    designer: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: { configTabJson },
  name: "config-tabs",
  data() {
    return {};
  },
  methods: {
    changeValue(val) {
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped lang="scss">
</style>