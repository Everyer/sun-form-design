<template>
  <div>
    <el-input
      @change="changeVal"
      :type="type=='数字'?'number':'text'"
      v-model="widgetValue"
      :size="size"
      :placeholder="placeholder"
    >
      <el-dropdown slot="append" @command="handleCommand">
        <el-button type="primary">
          {{type}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="字符">字符</el-dropdown-item>
          <el-dropdown-item command="布尔">布尔</el-dropdown-item>
          <el-dropdown-item command="数字">数字</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-input>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Boolean],
      default: null
    },
    size: {
      type: String,
      default: "medium"
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  model: {
    event: "change"
  },
  name: "CommonTypeInput",
  data() {
    return {
      widgetValue: null,
      type: "字符"
    };
  },
  methods: {
    changeVal(val) {
      var result;
      switch (this.type) {
        case "字符":
          result = val;
          break;
        case "布尔":
          if (val === "true") {
            result = true;
          } else if (val === "false") {
            result = false;
          } else {
            result = null;
            this.widgetValue = null;
          }
          break;
        case "数字":
          result = Number(val);
          break;
      }
      this.$emit("change", result);
    },
    handleCommand(command) {
      this.type = command;
      this.widgetValue = null;
    },
    init() {
      switch (typeof this.value) {
        case "string":
          this.type = "字符";
          this.widgetValue = this.value;
          break;
        case "boolean":
          this.type = "布尔";
          if (this.value) {
            this.widgetValue = "true";
          } else {
            this.widgetValue = "false";
          }
          break;
        case "number":
          this.type = "数字";
          this.widgetValue = this.value;
          break;
        default:
          this.type = "字符";
          this.widgetValue = null;
          break;
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        this.init();
      },
      immediate: true
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped lang="scss">
::v-deep {
  .el-button {
    padding-left: 10px;
    padding-right: 10px;
    span {
      font-size: 12px;
    }
  }
}
</style>