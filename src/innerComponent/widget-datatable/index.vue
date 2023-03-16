<template>
  <container-wrapper :widget="widget" :designer="designer" :parentList="parentList">
    <design-form-wrapper :designer="designer">
      <div
        class="widget_item_wrap"
        :class="{widget_item_wrap_top:widget.props.labelPosition=='top',widget_hide:widget.props.hide}"
      >
        <div class="con">
          <div class="table_item_title">
            按钮配置
            <el-button size="mini" type="primary" @click.stop="addButton">添加按钮</el-button>
          </div>
          <div class="table_item_list">
            <vxe-table
              class="my_table sortable-row-demo"
              row-key
              :row-class-name="rowClassName"
              ref="xTable1"
              :scroll-y="{enabled: false}"
              :data="widget.props.tableConfig.buttonList"
              show-header-overflow
              highlight-hover-row
              auto-resize
              border
              stripe
              round
              empty-text="暂无数据"
              resizable
              header-row-class-name="my_head"
            >
              <vxe-table-column width="55" align="center">
                <template #default>
                  <span class="drag-btn">
                    <i class="vxe-icon--menu"></i>
                  </span>
                </template>
              </vxe-table-column>
              <vxe-table-column width="160" field="id" title="唯一名称">
                <template #default="{ row ,rowIndex }">{{row.id}}</template>
              </vxe-table-column>
              <vxe-table-column field="id" title="按钮样式">
                <template #default="{ row ,rowIndex }">
                  <el-button
                    :type="row.props.type"
                    :size="row.props.size"
                    :icon="row.props.icon"
                    :plain="row.props.isPlain"
                    :round="row.props.isRound"
                    :disabled="row.props.disabled"
                  >{{row.props.buttonText}}</el-button>
                </template>
              </vxe-table-column>
              <vxe-table-column field="name" title="按钮名称">
                <template #default="{ row ,rowIndex }">
                  <el-input size="mini" v-model="row.props.buttonText" placeholder="请输入按钮名称"></el-input>
                </template>
              </vxe-table-column>
              <vxe-table-column width="180" title="操作" align="center">
                <template #default="{ row ,rowIndex }">
                  <el-button-group>
                    <!-- <el-button
                      size="mini"
                      type="primary"
                      icon="el-icon-plus"
                      plain
                      @click.stop="addButton(rowIndex)"
                    >新增</el-button>-->
                    <el-button
                      size="mini"
                      type="primary"
                      icon="el-icon-minus"
                      plain
                      @click.stop="del(rowIndex,'buttonList')"
                    >删除</el-button>
                    <el-button
                      size="mini"
                      type="primary"
                      icon="el-icon-circle-check"
                      plain
                      @click.stop="chooseButton(rowIndex,row)"
                    >选中</el-button>
                  </el-button-group>
                </template>
              </vxe-table-column>
            </vxe-table>
          </div>
          <div class="table_item_title" v-if="!widget.props.tableConfig.baseInfo.normalTable">
            查询条件配置
            <div class="btn_wrap">
              <el-dropdown trigger="click" @command="handleCommand">
                <el-button type="primary" size="mini">
                  添加查询条件
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(item, index) in queryAddList"
                    :command="item.type"
                    :key="index"
                  >{{item.displayName}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="table_item_list" v-if="!widget.props.tableConfig.baseInfo.normalTable">
            <vxe-table
              class="my_table sortable-row-demo"
              row-key
              :row-class-name="rowClassName"
              ref="xTable2"
              :scroll-y="{enabled: false}"
              :data="widget.props.tableConfig.queryList"
              show-header-overflow
              highlight-hover-row
              auto-resize
              empty-text="暂无数据"
              border
              stripe
              round
              resizable
              header-row-class-name="my_head"
            >
              <vxe-table-column width="55" align="center">
                <template #default>
                  <span class="drag-btn">
                    <i class="vxe-icon--menu"></i>
                  </span>
                </template>
              </vxe-table-column>
              <vxe-table-column width="160" field="id" title="唯一名称">
                <template #default="{ row ,rowIndex }">{{row.id}}</template>
              </vxe-table-column>
              <vxe-table-column field="id" title="组件样式">
                <template #default="{ row ,rowIndex }">
                  <component
                    :is="'widget-'+row.type"
                    :widget="row"
                    :key="row.id"
                    :designer="designer"
                  ></component>
                </template>
              </vxe-table-column>
              <vxe-table-column width="160" field="label" title="查询标签">
                <template #default="{ row ,rowIndex }">
                  <el-input size="mini" v-model="row.props.label" placeholder="请输入查询标签"></el-input>
                </template>
              </vxe-table-column>
              <vxe-table-column width="160" field="zdname" title="查询字段">
                <template #default="{ row ,rowIndex }">
                  <el-input size="mini" v-model="row.props.zdname" placeholder="请输入查询字段"></el-input>
                </template>
              </vxe-table-column>

              <vxe-table-column width="180" title="操作" align="center">
                <template #default="{ row ,rowIndex }">
                  <el-button-group>
                    <!-- <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-plus"
                    plain
                    @click.stop="addButton(rowIndex)"
                    >新增</el-button>-->
                    <el-button
                      size="mini"
                      type="primary"
                      icon="el-icon-minus"
                      plain
                      @click.stop="del(rowIndex,'queryList')"
                    >删除</el-button>
                    <el-button
                      size="mini"
                      type="primary"
                      icon="el-icon-circle-check"
                      plain
                      @click.stop="chooseButton(rowIndex,row)"
                    >选中</el-button>
                  </el-button-group>
                </template>
              </vxe-table-column>
            </vxe-table>
          </div>
          <div class="table_item_title">
            表头配置
            <div class="btn_wrap">
              <el-dropdown trigger="click" @command="handleCommandTable">
                <el-button type="primary" size="mini">
                  添加表头
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(item, index) in tableAddList"
                    :command="item.type"
                    :key="index"
                  >{{item.displayName}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="table_item_list">
            <vxe-table
              class="my_table sortable-row-demo"
              row-key
              :row-class-name="rowClassName"
              ref="xTable3"
              :scroll-y="{enabled: false}"
              :data="widget.props.tableConfig.tableList"
              show-header-overflow
              highlight-hover-row
              auto-resize
              border
              empty-text="暂无数据"
              stripe
              round
              resizable
              header-row-class-name="my_head"
            >
              <vxe-table-column width="55" align="center">
                <template #default>
                  <span class="drag-btn">
                    <i class="vxe-icon--menu"></i>
                  </span>
                </template>
              </vxe-table-column>
              <vxe-table-column width="160" field="id" title="唯一名称">
                <template #default="{ row ,rowIndex }">{{row.id}}</template>
              </vxe-table-column>
              <vxe-table-column field="id" title="组件样式">
                <template #default="{ row ,rowIndex }">
                  <component
                    :is="'widget-'+row.type"
                    :widget="row"
                    :key="row.id"
                    :designer="designer"
                  ></component>
                </template>
              </vxe-table-column>
              <vxe-table-column width="160" field="label" title="表头标签">
                <template #default="{ row ,rowIndex }">
                  <el-input size="mini" v-model="row.props.label" placeholder="请输入表头标签"></el-input>
                </template>
              </vxe-table-column>
              <vxe-table-column width="160" field="zdname" title="表头字段">
                <template #default="{ row ,rowIndex }">
                  <el-input size="mini" v-model="row.props.zdname" placeholder="请输入表头字段"></el-input>
                </template>
              </vxe-table-column>

              <vxe-table-column width="180" title="操作" align="center">
                <template #default="{ row ,rowIndex }">
                  <el-button-group>
                    <!-- <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-plus"
                    plain
                    @click.stop="addButton(rowIndex)"
                    >新增</el-button>-->
                    <el-button
                      size="mini"
                      type="primary"
                      icon="el-icon-minus"
                      plain
                      @click.stop="del(rowIndex,'tableList')"
                    >删除</el-button>
                    <el-button
                      size="mini"
                      type="primary"
                      icon="el-icon-circle-check"
                      plain
                      @click.stop="chooseButton(rowIndex,row)"
                    >选中</el-button>
                  </el-button-group>
                </template>
              </vxe-table-column>
            </vxe-table>
          </div>
        </div>
      </div>
    </design-form-wrapper>
    <form-mode-wrapper :designer="designer">
      <widget-table @input="inputValue" ref="my_datatable" :designer="designer" :widget="widget"></widget-table>
    </form-mode-wrapper>
  </container-wrapper>
</template>

<script>
import Draggable from "vuedraggable";
import widgetConfig from "@/mixins/widgetConfig";
import Sortable from "sortablejs";
import widgetTable from "./widget-table";
export default {
  components: { Draggable, widgetTable },
  props: {
    widget: {
      type: Object,
      default: () => {
        return {};
      }
    },
    designer: {
      type: Object,
      default: () => {
        return {};
      }
    },
    parentList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  name: "widget-datatable",
  data() {
    return {
      that: this,
      widgetConfig: this.$utils.clone(widgetConfig, true),
      queryAddList: [],
      tableAddList: [],
      sortTableList: [
        {
          tableName: "xTable1",
          listName: "buttonList"
        },
        {
          tableName: "xTable2",
          listName: "queryList"
        },
        {
          tableName: "xTable3",
          listName: "tableList"
        }
      ]
    };
  },
  watch: {
    "widget.props.value"(val) {
      if (val) {
        this.$refs.my_datatable.setRows(val);
      }
    }
  },
  methods: {
    inputValue(rows) {
      this.$set(this.widget.props, "value", rows);
    },
    rowDrop(tableName, listName) {
      this.$nextTick(() => {
        const xTable = this.$refs[tableName];
        if (!xTable) {
          return;
        }
        this.sortable = Sortable.create(
          xTable.$el.querySelector(".body--wrapper>.vxe-table--body tbody"),
          {
            handle: ".drag-btn",
            onEnd: ({ newIndex, oldIndex }) => {
              const currRow = this.widget.props.tableConfig[listName].splice(
                oldIndex,
                1
              )[0];
              this.widget.props.tableConfig[listName].splice(
                newIndex,
                0,
                currRow
              );
            }
          }
        );
      });
    },
    deleteObjItem(obj, objKey) {
      if (obj.hasOwnProperty(objKey)) {
        delete obj[objKey];
      }
    },
    handleCommandTable(command) {
      var w = this.$utils.clone(this.widgetConfig, true);
      var obj = w[command];
      var id = "query-item-" + Math.floor(new Date().getTime() % 10000000);
      obj.id = id;
      obj.props.id = id;
      obj.parentType = "datatable";

      if (obj.props.size) {
        obj.props.size = "mini";
      }
      this.widget.props.tableConfig.tableList.push(obj);
    },
    handleCommand(command) {
      var w = this.$utils.clone(this.widgetConfig, true);
      var obj = w[command];
      var id = "query-item-" + Math.floor(new Date().getTime() % 10000000);
      obj.id = id;
      obj.props.id = id;
      obj.parentType = "datatable";
      if (obj.props.size) {
        obj.props.size = "mini";
      }
      obj.props.width = 8;
      this.widget.props.tableConfig.queryList.push(obj);
    },
    rowClassName({ row, rowIndex }) {
      if (!this.designer.chosenWidget) {
        return "";
      }
      if (row.id === this.designer.chosenWidget.id) {
        return "row-selected";
      }
      return "";
    },
    addButton(rowIndex) {
      var id = "button-item-" + Math.floor(new Date().getTime() % 10000000);
      var w = this.$utils.clone(this.widgetConfig, true);
      var obj = w["button"];
      obj.id = id;
      obj.props.id = id;
      obj.parentType = "datatable";
      obj.props.onTableClick = null;
      obj.props.isSide = false;
      obj.props.size = "mini";
      this.deleteObjItem(obj.props, "width");
      this.deleteObjItem(obj.props, "labelWidth");
      this.deleteObjItem(obj.props, "labelPosition");
      this.deleteObjItem(obj.props, "labelAlign");
      this.deleteObjItem(obj.props, "value");
      this.deleteObjItem(obj.props, "zdname");
      this.deleteObjItem(obj.props, "label");
      this.deleteObjItem(obj.props, "onClick");

      this.widget.props.tableConfig.buttonList.push(obj);
    },
    clear(type) {
      this.$confirm("确定清空所有按钮吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.widget.props.tableConfig[type] = [];
        })
        .catch(() => {});
    },
    chooseButton(rowIndex, row) {
      this.designer.clearAllActive();
      this.$nextTick(() => {
        this.designer.chosenWidget = row;
      });
    },
    del(rowIndex, type) {
      this.widget.props.tableConfig[type].splice(rowIndex, 1);
    }
  },
  created() {
    for (var i in widgetConfig) {
      widgetConfig[i].type = i;
      if (widgetConfig[i].canAddDataTableQuery) {
        this.queryAddList.push(widgetConfig[i]);
      }
      if (widgetConfig[i].canAddDataTableList) {
        this.tableAddList.push(widgetConfig[i]);
      }
    }
    if (!this.designer.formMode) {
      this.sortTableList.forEach(item => {
        this.rowDrop(item.tableName, item.listName);
      });
    }
    
    // this.designer.eventHandle(null, "onCreated", this.widget, this);
  },
  mounted() {
    // this.designer.eventHandle(null, "onMounted", this.widget,this);
  }
};
</script>

<style scoped lang="scss">
.widget_item_wrap {
  position: relative;
  width: 100%;
  height: 100%;
  .con {
    .table_item_title {
      color: #409eff;
      font-size: 17px;
      padding: 5px 10px;
      border: 1px solid #409eff;
      border-left: 3px solid #409eff;
      border-radius: 0 5px 5px 0;
      margin: 10px 0 5px;
      background: #fff;
      -webkit-box-shadow: 0 0 12px 0 rgba(135, 214, 238, 0.2);
      box-shadow: 0 0 12px 0 rgba(135, 214, 238, 0.2);
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      align-items: center;
      -ms-flex-pack: justify;
      justify-content: space-between;
    }
    .table_item_list {
      min-height: 100px;
      // border: 1px dashed #cccccc;
      .drag_wrapper {
        min-height: 100px;
        padding: 5px;
        box-sizing: border-box;
        .widget_item {
          margin: 10px 0;
        }
      }
    }
  }
}
::v-deep {
  .row-selected {
    background-color: #40a0ff51 !important;
  }
  .table_wrap {
    .container_wrapper {
      padding: 0;
      border: none;
      .lab {
        display: none !important;
      }
    }
  }

  .vxe-table--render-default .vxe-body--column:not(.col--ellipsis) {
    padding: 5px 0;
  }
}
</style>