<template>
  <div class="json_wrap">
    <div class="title" v-if="type!='hideCheck'">字典生成</div>
    <div class="content">
      <div class="item" v-for="(item, index) in d" :key="index">
        <!-- <div class="form_item" v-if="type!='hideCheck'">
          <el-radio
            v-if="type!='multi'"
            @change="changeCheck"
            v-model="checked"
            :label="item.value"
          ></el-radio>
          <el-checkbox
            v-if="type=='multi'"
            @change="changeCheckMulti"
            v-model="item.checked"
            :label="item.value"
          ></el-checkbox>
        </div>-->
        <div class="form_item">
          <el-input size="mini" v-model="item.label"></el-input>
        </div>
        <div class="form_item">
          <!-- <el-input size="mini" v-model="item.value"></el-input> -->
          <CommonTypeInput size="mini" v-model="item.value"></CommonTypeInput>
        </div>
        <div class="form_item">
          <el-button
            plain
            type="primary"
            size="mini"
            icon="el-icon-delete"
            circle
            @click="delItem(item)"
          ></el-button>
        </div>
      </div>
      <div class="add">
        <el-button type="text" @click="addItem" icon="el-icon-circle-plus-outline">添加选项</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      }
    },
    type: {
      type: String,
      default: ""
    }
  },
  model: {
    event: "changeModelValue"
  },
  name: "CommonJsonListEdit",
  data() {
    return {
      timer: null,
      checked: null,
      d: []
    };
  },
  watch: {
    // value: {
    //   handler(val) {
    //     this.d = this.$utils.clone(val,true);
    //   },
    //   immediate: true
    // },
    d: {
      handler(val) {
        clearInterval(this.timer);
        this.timer = setTimeout(() => {
          this.$emit("changeModelValue", val);
        }, 400);
      },
      immediate: true
    }
  },
  methods: {
    changeCheckMulti(val) {
      var arr = [];
      this.d.forEach(item => {
        if (item.checked) {
          arr.push(item.value);
        }
      });
      var str = arr.join(",");
      this.$emit("changeValue", str);
    },
    changeCheck(val) {
      this.checked = val;
      this.$emit("changeValue", this.checked);
    },
    delItem(item) {
      this.d.splice(this.d.indexOf(item), 1);
    },
    addItem() {
      this.d.push({
        value: null,
        label: null
      });
    }
  },
  created() {
    this.d = this.$utils.clone(this.value, true);
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.json_wrap {
  width: 100%;
  .item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }
  .form_item {
    margin: 0 3px;
  }
}
::v-deep {
  .el-radio__label {
    display: none;
  }
  .el-checkbox__label {
    display: none;
  }
}
</style>