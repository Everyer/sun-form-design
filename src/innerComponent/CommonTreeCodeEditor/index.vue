<template>
  <div>
    <div class="editor_wrap form_show_wrap">
      <div
        class="table_wrap"
        @mouseover="showPopover=true"
        @mouseout="showPopover=false"
        v-show="showPopover"
      >
        <el-table @row-click="tabRowClick" :data="tableData" :height="400">
          <el-table-column width="200" property="name" label="方法名称"></el-table-column>
          <el-table-column width="180" property="description" label="方法描述"></el-table-column>
          <el-table-column property="example" label="方法示例"></el-table-column>
        </el-table>
      </div>
      <div class="form_side">
        <el-tree default-expand-all :data="treeData" :props="defaultProps">
          <div
            class="custom-tree-node"
            @mouseover="overHandle(data)"
            @mouseout="outHandle(data)"
            slot-scope="{ node, data }"
          >
            <span class="tree_title">
              {{data.props.label||data.props.buttonText}}
              <span
                class="tree_id"
              >__{{data.displayName}}__{{data.id}}</span>
            </span>
            <span>
              <el-button slot="reference" type="text">
                <i class="el-icon-edit">选择</i>
              </el-button>
            </span>
          </div>
        </el-tree>
      </div>
      <div class="form_content">
        <div class="bar">
          {{functionName||"success"}}
          <span class="code">( {{funcProps||'res , self'}} ) {</span>
        </div>
        <common-code-editor ref="editor" height="400px" v-model="dataObj"></common-code-editor>
        <div class="bar">
          <span class="code">}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    funcProps: {
      type: String,
      default: () => {
        return "";
      }
    },
    functionName: {
      type: String,
      default: () => {
        return "";
      }
    },
    designer: {
      type: Object,
      default: () => {
        return {};
      }
    },
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
  name: "CommonTreeCodeEditor",
  data() {
    return {
      dataObj: "",
      treeData: [],
      showPopover: false,
      dataId: "",
      type: "",
      tableData: [],
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
    outHandle(data) {
      this.showPopover = false;
    },
    overHandle(data) {
      this.type = data.type;
      this.dataId = data.id;
      this.tableData = this.formatTable(data.type, data.id);
      this.showPopover = true;
    },
    showHandle(id) {
      this.showPopover = true;
      this.dataId = id;
    },
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
  position: relative;

  .table_wrap {
    position: absolute;
    left: 380px;
    top: 0px;
    border-radius: 5px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
    z-index: 7;
    width: 600px;
    height: 400px;
    background: #ffffff;
    padding: 10px;
  }
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
    position: relative;
    overflow-x: auto;

    .custom-tree-node {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin: 0;
      padding: 2px 0;
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
