<template>
  <div>
    <el-button
      size="mini"
      plain
      :type="dataObj.apiurl?'primary':'info'"
      round
      @click="show=true"
    >接口配置</el-button>
    <vxe-modal
      v-model="show"
      :fullscreen="false"
      width="1200px"
      height="700px"
      :transfer="true"
      :destroy-on-close="true"
      @show="showModal"
      @hide="hideModal"
    >
      <template #title>
        <span>接口配置</span>
      </template>
      <template #default>
        <div class="form_mode">
          <div class="item">
            <div class="lab">发送方式</div>
            <div class="con">
              <el-radio-group v-model="dataObj.method" size="small">
                <el-radio-button label="get">GET</el-radio-button>
                <el-radio-button label="post">POST</el-radio-button>
                <el-radio-button label="put">PUT</el-radio-button>
                <el-radio-button label="patch">PATCH</el-radio-button>
                <el-radio-button label="delete">DELETE</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="item">
            <div class="lab">数据格式</div>
            <div class="con">
              <el-radio-group v-model="dataObj.contentType" size="small">
                <el-radio-button label="JSON">JSON</el-radio-button>
                <el-radio-button label="FormData">FormData</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="item">
            <div class="lab">接口地址</div>
            <div class="con">
              <el-input v-model="dataObj.apiurl" size="small" placeholder="例：/api/getData"></el-input>
            </div>
          </div>
          <div class="item">
            <div class="lab">发送数据（JSON键值对：字段名/值）</div>
            <div class="con">
              <div class="editor_wrap">
                <CommonJsonListEdit type="hideCheck" v-model="dataObj.params"></CommonJsonListEdit>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="lab">
              请求前格式化参数（返回出一个对象）
              <el-switch v-model="show1" active-text="展开" inactive-text="收起"></el-switch>
            </div>
            <div class="con">
              <div class="form_content" v-if="show1">
                <div class="bar">
                  beforeSend
                  <span class="code">( param , self ) {</span>
                </div>
                <common-code-editor ref="editor" height="250px" v-model="dataObj.beforeSend"></common-code-editor>
                <div class="bar">
                  <span class="code">}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="item" v-if="fieldVisible">
            <div class="lab">字段配置</div>
            <div class="con">
              <div class="editor_wrap field_visible_wrap">
                <div class="item">
                  <div class="lab">显示值字段</div>
                  <div class="con">
                    <el-input v-model="dataObj.labelField" size="small" placeholder="显示值字段"></el-input>
                  </div>
                </div>
                <div class="item">
                  <div class="lab">真实值字段</div>
                  <div class="con">
                    <el-input v-model="dataObj.valueField" size="small" placeholder="真实值字段"></el-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="item" v-if="show">
            <div class="lab">
              返回数据处理
              <el-switch v-model="show2" active-text="展开" inactive-text="收起"></el-switch>
            </div>
            <div class="con">
              <CommonTreeCodeEditor v-model="dataObj.dataFormat" v-if="show2" :designer="designer"></CommonTreeCodeEditor>
            </div>
          </div>
        </div>
      </template>
    </vxe-modal>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    designer: {
      type: Object,
      default: () => {
        return {};
      }
    },
    value: {
      type: Object,
      default: () => {
        return {};
      }
    },
    fieldVisible: {
      type: Boolean,
      default: false
    }
  },
  model: {
    event: "change"
  },
  name: "CommonHttpSet",
  data() {
    return {
      show: false,
      show1: false,
      show2: false,
      dataObj: {},
      treeData: [],
      defaultProps: {
        children: "widgetList",
        label: "displayName"
      }
    };
  },
  watch: {
    dataObj: {
      handler(val) {
        this.$emit("change", val);
      },
      deep: true
    },
    value: {
      handler(val) {
        this.dataObj = val;
      },
      deep: true
    }
  },
  methods: {
    showModal() {
      if (this.dataObj.dataFormat) {
        this.show2 = true;
      } else {
        this.show2 = false;
      }
      if (this.dataObj.beforeSend) {
        this.show1 = true;
      } else {
        this.show1 = false;
      }
    },
    hideModal() {},
    tabRowClick(row) {
      this.$refs.editor.insertCode(row.example);
      this.showPopover = false;
    },
    formatTable(type, id) {
      var table = this.$utils.clone(this.designer.remark[type], true);
      table.forEach(item => {
        if (item.example.includes("{id}")) {
          item.example = item.example.replace("{id}", `"${id}"`);
        }
      });
      return table;
    },
    chooseCode(node, data) {
      this.$refs.editor.insertCode(`app.getWidget("${data.id}")`);
    }
  },
  created() {
    this.treeData = this.designer.formatTreeList();
    this.dataObj = this.value;
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.item {
  margin: 15px 0;
  .lab {
    margin: 5px 0;
    font-weight: bold;
    // font-style: italic;
    font-size: 16px;
    position: relative;
    padding-left: 5px;
    &::before {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      top: 4px;
      width: 3px;
      background: #409eff;
      height: 16px;
    }
  }
}
.field_visible_wrap {
  display: flex;
  align-items: center;
  padding-left: 20px;
  .item {
    display: flex;
    align-items: center;
    margin-right: 20px;
    .lab {
      margin-right: 10px;
      font-size: 13px;
    }
  }
}
.form_show_wrap {
  height: 468px !important;
}
.editor_wrap {
  height: 100%;
  display: flex;

  .form_side {
    box-sizing: border-box;
    flex: 0 0 400px;
    border: 1px solid #409eff;
    margin-right: 10px;
    padding: 5px 5px 0px;
    box-sizing: border-box;
    overflow: auto;
    .custom-tree-node {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .el-button {
        padding: 0;
        margin: 0;
        font-size: 12px;
        color: #909399;
        &:hover {
          color: #409eff;
        }
      }
      .el-button:nth-child(2) {
        margin-left: 5px;
      }
      .tree_title {
        font-size: 12px;
        white-space: nowrap;
        .tree_id {
          font-size: 12px;
          color: #409eff;
          font-style: italic;
        }
      }
    }
  }
}
.form_content {
  flex: 1;
  display: flex;
  height: 100%;
  flex-direction: column;
  .bar {
    background: rgb(47, 49, 41);
    color: rgb(95, 196, 214);
    font-weight: bold;
    font-size: 16px;
    padding: 5px 10px;
    box-sizing: border-box;
    flex: 0 0 30px;
    font-style: italic;
    .code {
      color: rgb(213, 214, 208);
    }
  }
}
</style>
