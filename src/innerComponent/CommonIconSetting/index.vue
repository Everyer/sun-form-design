<template>
  <div>
    <el-input @focus="show=true" v-model="iconValue" placeholder="请选择图标" size="mini"></el-input>
    <vxe-modal
      v-model="show"
      :fullscreen="false"
      width="80%"
      height="80%"
      :transfer="true"
      :destroy-on-close="true"
    >
      <template #title>
        <span>按钮选择</span>
      </template>
      <template #default>
        <icon-list @setIcon="setIcon" v-model="iconValue"></icon-list>
      </template>
    </vxe-modal>
  </div>
</template>

<script>
import iconList from "./iconList";
export default {
  components: { iconList },
  name: "CommonIconSetting",
  props: {
    value: {
      type: String,
      default: () => {
        return "";
      }
    }
  },
  model: {
    event: "change"
  },
  data() {
    return {
      show: false,
      iconValue: ""
    };
  },
  methods: {
    setIcon(icon){
        this.iconValue = icon;
        this.$emit("change", icon);
        this.show=false
    }
  },
  created() {
    this.iconValue = this.value;
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
</style>