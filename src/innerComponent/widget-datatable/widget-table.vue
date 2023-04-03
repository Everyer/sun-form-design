<template>
  <div
    class="weblist_wrap sun_form_datatable"
    :style="{height:baseInfo.formTableMode=='table'?(widget.props.height||null):null}"
  >
    <div class="top_wrap">
      <div
        class="tools_wrap"
        v-if="tableConfig.buttonList.filter(e=>!e.props.isSide).length||tableConfig.queryList.length"
      >
        <div class="slot_wrap">
          <div class="query_wrap" v-if="tableConfig.queryList.length&&!baseInfo.normalTable">
            <div
              class="query_item"
              :style="{width:4.16667*item.props.width+'%'}"
              v-for="(item, index) in tableConfig.queryList"
              :key="index"
            >
              <div class="lab">{{item.props.label}}</div>
              <div class="con">
                <component
                  :is="'widget-'+item.type"
                  :widget="item"
                  v-model="item.props.value"
                  :key="item.id"
                  :designer="designer"
                ></component>
              </div>
            </div>
          </div>
          <div
            class="query_btn_wrap"
            v-if="(tableConfig.buttonList.filter(e=>!e.props.isSide).length||tableConfig.queryList.length)&&!baseInfo.normalTable"
          >
            <div class="btn_wrap">
              <el-button
                v-if="!widget.props.isDetail"
                :size="'mini'"
                :plain="item.props.isPlain"
                :round="item.props.isRound"
                :type="item.props.type"
                :icon="item.props.icon"
                :disabled="item.props.disabled"
                v-show="!item.props.hide"
                v-for="(item, index) in tableConfig.buttonList.filter(e=>!e.props.isSide)"
                :key="index"
                @click="buttonClick(item)"
              >{{item.props.buttonText}}</el-button>
            </div>
            <div
              class="from_table_title"
              :class="{required:widget.props.required}"
              v-if="baseInfo.normalTable"
            >{{widget.props.label}}</div>
            <div class="tab_btn_wrap" v-if="!baseInfo.normalTable">
              <el-button @click="reset" icon="el-icon-refresh-left" size="mini">重置</el-button>
              <el-button type="primary" @click="refresh" icon="el-icon-search" size="mini">搜索</el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="table_wrap" v-show="baseInfo.formTableMode=='table'">
        <div class="query_btn_wrap" v-if="baseInfo.normalTable">
          <div class="btn_wrap">
            <el-button @click="addRow" icon="el-icon-plus" size="mini" type="primary">新增</el-button>
            <el-button @click="clearRow" icon="el-icon-delete" size="mini" type="primary">清空</el-button>
            <el-button
              v-if="!widget.props.isDetail"
              :size="'mini'"
              :plain="item.props.isPlain"
              :round="item.props.isRound"
              :type="item.props.type"
              :icon="item.props.icon"
              :disabled="item.props.disabled"
              v-show="!item.props.hide"
              v-for="(item, index) in tableConfig.buttonList.filter(e=>!e.props.isSide)"
              :key="index"
              @click="buttonClick(item)"
            >{{item.props.buttonText}}</el-button>
          </div>
          <div
            class="from_table_title"
            :class="{required:widget.props.required}"
            v-if="baseInfo.normalTable"
          >{{widget.props.label}}</div>
        </div>
        <vxe-table
          class="my_table"
          ref="my_table"
          :key="tableKey"
          :data="rows"
          :height="widget.props.height?'auto':null"
          border
          show-header-overflow
          :show-overflow="baseInfo.showOverFlow"
          highlight-hover-row
          auto-resize
          :stripe="baseInfo.isStripe"
          :loading-config="{text: '数据加载中...'}"
          round
          resizable
          :loading="loading"
          :row-config="{isCurrent: true, isHover: true}"
          :checkbox-config="checkboxConfig"
          :radio-config="radioConfig"
          header-row-class-name="my_head"
          :show-footer="Object.keys(footer).length>0"
          :footer-method="footerMethod"
          @cell-dblclick="dblRowHandle"
        >
          <vxe-table-column
            width="50"
            v-if="!baseInfo.singleselect&&!baseInfo.normalTable"
            type="checkbox"
            field="my_check"
            align="center"
          ></vxe-table-column>
          <vxe-table-column
            width="50"
            v-if="baseInfo.singleselect&&!baseInfo.normalTable"
            type="radio"
            field="my_check"
            align="center"
          ></vxe-table-column>
          <vxe-table-column align="center" type="seq" title="序号" width="60" field="index"></vxe-table-column>

          <vxe-table-column
            v-for="(item, index) in tableConfig.tableList"
            :key="index"
            :field="item.props.zdname"
            :title="item.props.label"
            :align="baseInfo.align"
            :width="item.props.tableitemWidth"
          >
            <template #default="{ row ,rowIndex }">
              <div class="column_item" v-if="item.type=='datatableitem'">
                {{item.props.width}}
                <div
                  class="column_item_wrap"
                  v-if="item.props.onFormat"
                  v-html="formatCell(row,item.props.zdname,item.props.onFormat)"
                ></div>
                <div class="column_item_wrap" v-else>{{row[item.props.zdname]}}</div>
              </div>
              <div class="column_item" v-else>
                <component
                  :is="'widget-'+item.type"
                  :widget="item"
                  v-model="row[item.props.zdname]"
                  :key="item.id"
                  :designer="designer"
                ></component>
              </div>
            </template>
          </vxe-table-column>
          <vxe-table-column
            v-if="tableConfig.buttonList.filter(e=>e.props.isSide).length||(baseInfo.normalTable&&baseInfo.formTableMode=='table')"
            :title="'操作'"
            :align="'center'"
            :fixed="'right'"
            :width="baseInfo.formTableMode=='table'?(tableConfig.buttonList.filter(e=>e.props.isSide).length+1)*110:tableConfig.buttonList.filter(e=>e.props.isSide).length*110"
          >
            <template #default="{ row ,rowIndex,$rowIndex }">
              <div>
                <el-button
                  v-if="baseInfo.normalTable&&baseInfo.formTableMode=='table'"
                  @click="removeRow($rowIndex)"
                  icon="el-icon-delete"
                  size="mini"
                  type="primary"
                >删除</el-button>
                <el-button
                  class="my_btn"
                  v-for="(item, index) in tableConfig.buttonList.filter(e=>e.props.isSide)"
                  :key="index"
                  :plain="item.props.isPlain"
                  :round="item.props.isRound"
                  :type="item.props.type"
                  size="mini"
                  :icon="item.props.icon"
                  :disabled="item.props.disabled"
                  v-show="!item.props.hide&&!widget.props.isDetail"
                  @click.stop="buttonClick(item,row,$rowIndex)"
                >{{item.props.buttonText}}</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <!-- {{baseInfo}} -->
      <div class="tab_wrap" v-if="baseInfo.normalTable&&baseInfo.formTableMode=='tab'">
        <div class="query_btn_wrap">
          <div class="btn_wrap">
            <el-button @click="addRow" icon="el-icon-plus" size="mini" type="primary">新增</el-button>
            <el-button @click="clearRow" icon="el-icon-delete" size="mini" type="primary">清空</el-button>
            <el-button
              v-if="!widget.props.isDetail"
              :size="'mini'"
              :plain="item.props.isPlain"
              :round="item.props.isRound"
              :type="item.props.type"
              :icon="item.props.icon"
              :disabled="item.props.disabled"
              v-show="!item.props.hide"
              v-for="(item, index) in tableConfig.buttonList.filter(e=>!e.props.isSide)"
              :key="index"
              @click="buttonClick(item)"
            >{{item.props.buttonText}}</el-button>
          </div>
          <div
            class="from_table_title"
            :class="{required:widget.props.required}"
            v-if="baseInfo.normalTable"
          >{{widget.props.label}}</div>
        </div>
        <el-tabs
          @tab-remove="removeTab"
          :closable="!this.widget.props.isDetail"
          v-model="activeName"
          type="border-card"
          v-if="rows.length"
          @tab-click="tabClick"
        >
          <el-tab-pane
            v-for="(row, rowsIndex) in rows"
            :key="rowsIndex"
            :label="widget.props.label+`${rowsIndex+1}`"
            :name="rowsIndex+''"
          >
            <div class="sun_form_wrap">
              <div
                class="sun_form_tab_item"
                v-for="(item, index) in tableConfig.tableList"
                :key="index"
                :style="{width:4.16667*item.props.width+'%'}"
              >
                <div class="column_item" v-if="item.type=='datatableitem'">
                  <div
                    class="column_item_wrap"
                    v-if="item.props.onFormat"
                    v-html="formatCell(row,item.props.zdname,item.props.onFormat)"
                  ></div>
                  <div class="column_item_wrap" v-else>{{row[item.props.zdname]}}</div>
                </div>
                <div class="column_item" v-else>
                  <widget-table
                    v-model="row[item.props.zdname]"
                    :parentData="formatParentData(row,rows,item.props.zdname)"
                    :table="{row,rowsIndex,value:row[item.props.zdname],widget:item,tableList:tableConfig.tableList}"
                    :designer="designer"
                    :key="item.id"
                    :widget="item"
                    v-if="item.type=='datatable'"
                  ></widget-table>
                  <component
                    v-else
                    :is="'widget-'+item.type"
                    :widget="item"
                    v-model="row[item.props.zdname]"
                    :key="item.id"
                    :table="{row,rowsIndex,value:row[item.props.zdname],widget:item,tableList:tableConfig.tableList}"
                    :designer="designer"
                  ></component>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="footer_wrap" v-if="baseInfo.hasPage&&!baseInfo.normalTable">
      <vxe-pager
        perfect
        :current-page.sync="pageIndex"
        :page-size.sync="pageSize"
        :loading="loading"
        :total="total"
        :page-sizes="pageArr"
        :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']"
        @page-change="pageChange"
      >
        <template #left>
          <el-button size="small" @click="refresh">
            <template #default>
              <i :class="{'el-icon-refresh':!loading,'el-icon-loading':loading}"></i>
            </template>
          </el-button>
        </template>
      </vxe-pager>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "changeHandle"
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      }
    },
    table: {
      type: Object,
      default: () => {
        return {};
      }
    },
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
    parentData: {
      type: Object,
      default: () => {
        return null;
      }
    }
  },
  components: {},
  name: "widget-table",
  data() {
    return {
      activeName: null,
      tmpRows: [],
      baseInfo: {},
      sortConfig: {},
      c: {},
      dragging: false,
      dragList: [
        { name: "John", id: true },
        { name: "Joao", id: false },
        { name: "Jean", id: true }
      ],
      showSetting: false,
      param: "",
      pageArr: [20, 40, 50, 80, 100, 200, 500, 1000],
      timeout: null,
      buttonList: [],
      zdzdList: [],
      footer: {},
      rows: [],
      total: 0,
      form: {},
      pageIndex: 1,
      pageSize: 10,
      singleselect: false,
      loading: false,
      tableKey: 1,
      checkboxConfig: {},
      radioConfig: {},
      originQueryValueObj: {},
      originQueryHidden: [],
      toggleQueryStatus: false,
      orderWhere: {},
      showAllSetting: false,
      setting: {},
      defaultItem: {}
    };
  },
  watch: {
    rows: {
      handler: function(val, oldVal) {
        this.$emit("input", val);
        this.$emit("changeHandle", val);
      },
      deep: true
    }
    // value: {
    //   handler: function(val, oldVal) {
    //     this.rows = val;
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },
  methods: {
    formatParentData(row, rows, zdname) {
      return {
        parentRow: rows[Number(this.activeName)],
        parentRows: rows,
        parentActiveIndex: Number(this.activeName),
        parentZdname: zdname
      };
    },
    tabClick() {
      var rowItem = this.rows[Number(this.activeName)];
      // this.tmpRows=rowItem;
    },
    reset() {
      var q = this.tableConfig.queryList;
      q.forEach(item => {
        item.props.value = item.props.defaultValue;
      });
      this.refresh();
    },
    refresh() {
      this.pageIndex = 1;
      this.getData();
    },
    pageChange() {
      this.getData();
    },
    getData() {
      var w = this.widget;
      var apiSet = w.props.apiSet;
      var method = apiSet.method;
      var baseInfo = this.baseInfo;
      var q = this.tableConfig.queryList;
      var param = {};
      q.forEach(item => {
        param[item.props.zdname] = item.props.value;
      });
      this.pageSize = Number(baseInfo.pageDefault);
      apiSet.params.forEach(item => {
        if (item.value.includes("${") && item.value.includes("}")) {
          var funStr = item.value.replace("${", "").replace("}", "");
          var fun = new Function("self", "app", "return " + funStr);
          param[item.label] = fun(this, this.designer);
        } else {
          param[item.label] = item.value;
        }
      });
      param[baseInfo.page] = this.pageIndex;
      param[baseInfo.limit] = this.pageSize;
      if (apiSet.contentType == "FormData") {
        if (method == "post" || method == "put" || method == "patch") {
          method += "FormData";
        }
      }
      if (!apiSet.apiurl) {
        return;
      }
      this.loading = true;
      this.designer.$http[method](apiSet.apiurl, param).then(res => {
        if (!apiSet.dataFormat) {
          if (res.success || res.code == "0" || res.code == 200) {
            var d = res.data || res.datas;
          }
        } else {
          var fun = new Function("res", "self", apiSet.dataFormat);
          var d = fun(res, this);
        }
        this.rows = d[baseInfo.rows];
        this.total = d[baseInfo.count];
        this.loading = false;
      });
    },
    chosen() {
      if (this.baseInfo.singleselect) {
        return this.$refs["my_table"].getRadioRecord();
      } else {
        return this.$refs["my_table"].getCheckboxRecords();
      }
    },
    getRows() {
      return this.rows;
    },
    setRows(rows) {
      this.rows = rows;
    },
    clearRow() {
      this.$set(this, "rows", []);
    },
    addRow() {
      var defaultItem = this.$utils.clone(this.defaultItem, true);
      this.rows.push(defaultItem);
      this.activeName = this.rows.length - 1 + "";
    },
    removeRow(rowIndex) {
      this.rows.splice(rowIndex, 1);
    },
    removeTab(targetName) {
      var clickNum = Number(targetName);
      var activeNum = Number(this.activeName);
      var max = this.rows.length - 1;
      if (clickNum == max) {
        if (activeNum == max) {
          this.activeName = max - 1 + "";
        }
      } else {
        if (activeNum == clickNum) {
          this.activeName = clickNum + "";
        } else if (activeNum > clickNum) {
          this.activeName = clickNum + "";
        }
      }
      this.rows.splice(clickNum, 1);
    },
    buttonClick(item, row, rowIndex) {
      var onTableClick = item.props.onTableClick;
      if (onTableClick) {
        var chosen = this.chosen();
        if (row) {
          chosen = row;
        }
        var fun = new Function(
          "chosen",
          "rowIndex",
          "self",
          "app",
          onTableClick
        );
        fun(chosen, rowIndex || null, this, this.designer);
      }
    },
    formatCell(row, zdname, eventStr) {
      if (eventStr) {
        let fun = new Function("row", "zdname", eventStr);
        return fun(row, zdname);
      } else {
        return row[zdname];
      }
    },
    dblRowHandle: function({ row }) {
      if (this.tableConfig.dblClick) {
        if (
          this.tableConfig.env == "iframe" &&
          window[this.tableConfig.dblClick]
        ) {
          window[this.tableConfig.dblClick](row);
        }

        if (
          this.tableConfig.env == "vue" &&
          this.$parent[this.tableConfig.dblClick]
        ) {
          this.$parent[this.tableConfig.dblClick](row);
        }
      }
    },
    footerMethod({ columns }) {
      var f = this.footer;
      var arr = [];
      if (f) {
        columns.forEach(e => {
          if (f.hasOwnProperty(e.field)) {
            arr.push(f[e.property]);
          } else {
            arr.push("");
          }
        });
      }
      arr[0] = "总计";
      return [arr];
    },
    init() {
      this.baseInfo = this.widget.props.tableConfig.baseInfo;
      if (this.baseInfo.singleselect) {
        this.radioConfig = {
          trigger: "row",
          labelField: "my_check",
          highlight: true
        };
      } else {
        this.checkboxConfig = {
          trigger: "row",
          labelField: "my_check",
          highlight: true,
          range: true
        };
      }
    }
  },
  created() {
    this.tableConfig = this.widget.props.tableConfig;
    this.designer.eventHandle(null, "onCreated", this.widget, this);
    this.init();
    if (this.baseInfo.normalTable) {
      var t = this.tableConfig.tableList;
      t.forEach(item => {
        this.defaultItem[item.props.zdname] = item.props.value;
      });
    }
    if (this.baseInfo.initLoadData && this.baseInfo.normalTable !== true) {
      this.getData();
    }
    this.widget.props.tableConfig.tableList.forEach(item => {
      this.$set(item.props, "isDetail", !!this.widget.props.isDetail);
    });
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.weblist_wrap {
  padding: 5px;
  padding-top: 0px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;

  .top_wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .tools_wrap {
      padding: 3px;
      box-sizing: border-box;
      // background: #fff;
      min-height: 38px;

      .slot_wrap {
        width: 100%;
      }
      .query_btn_wrap {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        border: 1px solid #f0f0f0;
        padding: 4px 10px;
        box-sizing: border-box;
        border-radius: 0px 0px 2px 2px;
        align-items: center;
        background: #fafafa;
        justify-content: space-between;
        .from_table_title {
          font-size: 16px;
          color: #333;
          color: #bbbbbb;
          user-select: none;
          font-weight: 700;
          opacity: 0.6;
        }
        .btn_wrap {
          flex-wrap: wrap;
          flex: 1;
          .my_btn {
            margin: 5px !important;
          }
        }
        .tab_btn_wrap {
          flex: 0 0 180px;
          text-align: right;
        }
      }
      .query_wrap {
        display: flex;
        flex-wrap: wrap;
        background-color: #ffffff;
        border: 1px solid #f0f0f0;
        padding: 5px;
        box-sizing: border-box;
        border-radius: 2px 2px 0px 0px;
        margin: 5px 0 0px;
        position: relative;
        border-bottom: none;
        .showMore {
          position: absolute;
          border: 1px solid #ccc;
          width: 80px;
          height: 18px;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          left: calc(50% - 40px);
          // right: -1px;
          bottom: -18px;
          border-top: none;
          background: #f4f5f7;
          border-radius: 0 0 5px 5px;
          cursor: pointer;
          color: #409eff;
          i {
            color: #409eff;
            font-size: 20px;
          }
        }
        .query_item {
          display: flex;
          align-items: center;
          padding: 3px 5px;
          width: 33%;
          box-sizing: border-box;
          .my_inp {
            width: 100%;
          }
          .lab {
            color: #666666;
            // font-weight: bold;
            padding-right: 10px;
            flex: 0 0 90px;
            font-size: 14px;
            text-align: right;
          }
          .con {
            flex: 1;
            display: flex;
            justify-content: space-between;
            .my_btn {
              width: 48%;
              margin-right: 0;
            }
          }
        }
        .w_25 {
          width: 25% !important;
          .query_btn {
            width: 100%;
          }
        }
        .w_33 {
          width: 33% !important;
          .query_btn {
            width: 100%;
          }
        }
        .w_50 {
          width: 50% !important;
          .query_btn {
            width: 50%;
          }
        }
        .w_100 {
          width: 100% !important;
          .query_btn {
            width: 25%;
          }
        }
        .query_btn {
          // flex: 1;
          display: flex;
          .my_btn {
            width: 100%;
          }
        }
      }
    }
    .table_wrap {
      flex: 1;
      overflow: hidden;
      width: 100%;
      padding: 3px 3px 0;
      box-sizing: border-box;
    }
    .tab_wrap {
      padding: 0 3px;
    }
    .query_btn_wrap {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      border: 1px solid #f0f0f0;
      padding: 4px 10px;
      box-sizing: border-box;
      border-radius: 0px 0px 2px 2px;
      align-items: center;
      background: #fafafa;
      justify-content: space-between;
      .from_table_title {
        font-size: 16px;
        color: #333;
        // color: #bbbbbb;
        user-select: none;
        font-weight: 700;
        opacity: 0.6;
      }
      .btn_wrap {
        flex-wrap: wrap;
        flex: 1;
        .my_btn {
          margin: 5px !important;
        }
      }
      .tab_btn_wrap {
        flex: 0 0 180px;
        text-align: right;
      }
    }
  }
  .footer_wrap {
    flex: 0 0 48px;
    // border:1px solid red;
    box-sizing: border-box;
    padding: 0 3px 3px;
  }
  .head_item {
    text-align: center;
    width: 100%;
  }
  .vxe-header--column.col--ellipsis {
    // height: 60px !important;
  }
  .vxe-header--column .vxe-cell {
    max-height: 80px !important;
  }
  .vxe-body--column {
    height: 36px !important;
  }
  .vxe-header--column {
    background: linear-gradient(to bottom, #fff 0, #f2f2f2 100%) !important;
    border-right: 1px solid #e8eaec !important;
  }
  .vxe-body--column.col--checkbox {
    background: linear-gradient(to bottom, #fff 0, #f2f2f2 100%) !important;
    border-right: 1px solid #e8eaec !important;
  }
  .vxe-loading {
    background-color: rgba(255, 255, 255, 0.9) !important;
  }
  .vxe-pager.is--loading::after {
    background-color: rgba(0, 0, 0, 0.1) !important;
  }
  .vxe-table--render-default .vxe-cell--checkbox .vxe-checkbox--label,
  .vxe-table--render-default .vxe-cell--radio .vxe-radio--label {
    padding-left: 0 !important;
  }
  .my_table {
    width: 100%;
  }
  .my_table .col-blue {
    color: #409eff !important;
    font-weight: bold;
    background-color: #f5f7fa;
  }
}
.list-group {
  user-select: none;
  .list-group-item {
    border: 1px solid #ccc;
    padding: 8px 10px;
    background: #fafafa;
    cursor: move;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    .drag_name {
      display: flex;
      align-items: center;
      .el-icon-rank {
        font-size: 14px;
        margin-right: 5px;
      }
    }
  }
}
.row--checked {
  background: #409eff !important;
  color: #ffffff !important;
}
.sun_form_wrap {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
:deep {
  .el-tabs__nav-prev,
  .el-tabs__nav-next {
    line-height: 42px;
  }
}
.required::before {
  color: #f56c6c;
  content: "*";
  display: inline-block;
  margin-right: 4px;
}
</style>