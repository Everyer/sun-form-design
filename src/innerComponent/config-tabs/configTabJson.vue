<template>
  <div class="json_wrap">
    <div class="title" v-if="type!='hideCheck'">字典生成</div>
    <div class="content">
      <div class="item" v-for="(item, index) in value" :key="index">
        <!-- <div class="form_item" v-if="type!='hideCheck'">
          <el-radio v-if="type!='multi'" @change="changeCheck" v-model="checked" :label="item.value"></el-radio>
          <el-checkbox  v-if="type=='multi'" @change="changeCheckMulti" v-model="item.checked" :label="item.value"></el-checkbox>
        </div> -->
        <div class="form_item">
          <el-input size="mini" v-model="item.label"></el-input>
        </div>
        <div class="form_item">
          <el-input size="mini" v-model="item.value"></el-input>
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
    event: "changeHandle"
  },
  name: "CommonJsonListEdit",
  data() {
    return {
      checked: null,
      d: []
    };
  },
  methods: {
    changeCheckMulti(val) {
      var arr=[]
      this.value.forEach(item=>{
        if(item.checked){
          arr.push(item.value)
        }
      });
      var str=arr.join(',')
      this.$emit("changeValue", str);
    },
    changeCheck(val) {
      this.checked = val;
      this.$emit("changeValue", this.checked);
    },
    delItem(item) {
      this.value.splice(this.value.indexOf(item), 1);
    },
    addItem() {
      this.value.push({
        value: null,
        label: null,
        widgetList:[],
      });
    }
  },
  created() {
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.json_wrap {
  width: 100%;
  .item{
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