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
              :style="designer.formatStyle(item)"
              v-if="!item.props.hide"
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
        <div
          class="query_btn_wrap"
          v-if="baseInfo.normalTable&&(tableConfig.buttonList.filter(e=>!e.props.isSide).length||!baseInfo.hideEditButton)"
        >
          <div class="btn_wrap">
            <el-button
              v-if="!widget.props.isDetail&&!baseInfo.hideEditButton"
              @click="addRow"
              icon="el-icon-plus"
              size="mini"
              type="primary"
            >新增</el-button>
            <el-button
              v-if="!widget.props.isDetail&&!baseInfo.hideEditButton"
              @click="clearRow"
              icon="el-icon-delete"
              size="mini"
              type="primary"
            >清空</el-button>
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
          :height="widget.props.height&&!designer.smallScreen?'auto':null"
          border
          show-header-overflow
          :show-overflow="baseInfo.showOverFlow"
          highlight-hover-row
          :tree-config="baseInfo.treeMode?treeConfig:null"
          auto-resize
          :stripe="baseInfo.treeMode?false:baseInfo.isStripe"
          :loading-config="{text: '数据加载中...'}"
          round
          resizable
          :loading="loading"
          :row-config="{isCurrent: true, isHover: true}"
          :checkbox-config="checkboxConfig"
          :radio-config="baseInfo.treeMode?null:radioConfig"
          header-row-class-name="my_head"
          :show-footer="Object.keys(footer).length>0"
          :footer-method="footerMethod"
          :rowConfig="{keyField: 'menuCode'}"
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
          <!-- <vxe-column field="name" title="app.body.label.name" tree-node></vxe-column> -->
          <vxe-table-column align="center" type="seq" title="序号" width="60" field="index">
            <template #default="{ row ,rowIndex }">{{rowIndex+(pageIndex-1)*pageSize+1}}</template>
          </vxe-table-column>

          <vxe-table-column
            v-for="(item, index) in tableConfig.tableList"
            :key="index"
            :field="item.props.zdname"
            :title="item.props.label"
            v-if="!item.props.hide"
            :align="baseInfo.align"
            :tree-node="index===0"
            :width="designer.smallScreen?(item.props.tableitemWidth||180):item.props.tableitemWidth"
          >
            <template #default="{ row ,rowIndex }">
              <div class="column_item" v-if="item.type=='datatableitem'">
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
                  :tableItemData="row"
                  :designer="designer"
                ></component>
              </div>
            </template>
          </vxe-table-column>
          <vxe-table-column
            v-if="tableConfig.buttonList.filter(e=>e.props.isSide&&!e.props.hide).length||(baseInfo.normalTable&&baseInfo.formTableMode=='table'&&!baseInfo.hideEditButton)"
            :title="'操作'"
            :align="'center'"
            :fixed="designer.smallScreen?null:'right'"
            :width="formatOprateWidth"
          >
            <!-- :width="(baseInfo.formTableMode=='table'&&baseInfo.normalTable)?(tableConfig.buttonList.filter(e=>e.props.isSide&&!e.props.hide).length+1)*110:tableConfig.buttonList.filter(e=>e.props.isSide&&!e.props.hide).length*110" -->
            <template #default="{ row ,rowIndex,$rowIndex }">
              <div>
                <el-button
                  v-if="baseInfo.normalTable&&baseInfo.formTableMode=='table'&&!baseInfo.hideEditButton"
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
                  :type="item.props.onButtonFormat?buttonFormat(row,item.props.onButtonFormat,'type'): item.props.type"
                  size="mini"
                  :icon="item.props.icon"
                  :disabled="buttonFormat(row,item.props.onButtonFormat,'disabled')"
                  v-show="(!item.props.hide&&buttonFormat(row,item.props.onButtonFormat,'show'))&&!widget.props.isDetail"
                  @click.stop="buttonClick(item,row,$rowIndex)"
                >{{item.props.buttonText}}</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <div class="tab_wrap" v-if="baseInfo.normalTable&&baseInfo.formTableMode=='tab'">
        <div class="query_btn_wrap">
          <div class="btn_wrap">
            <el-button
              v-if="!widget.props.isDetail&&!baseInfo.hideEditButton"
              @click="addRow"
              icon="el-icon-plus"
              size="mini"
              type="primary"
            >新增</el-button>
            <el-button
              v-if="!widget.props.isDetail&&!baseInfo.hideEditButton"
              @click="clearRow"
              icon="el-icon-delete"
              size="mini"
              type="primary"
            >清空</el-button>
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
                :style="designer.formatStyle(item)"
              >
                <div class="column_item column_tab_item" v-if="item.type=='datatableitem'">
                  <div
                    class="column_item_wrap"
                    v-if="item.props.onFormat"
                    v-html="formatCell(row,item.props.zdname,item.props.onFormat)"
                  ></div>
                  <div class="column_item_wrap" v-else>{{row[item.props.zdname]}}</div>
                </div>
                <div class="column_item column_tab_item" v-else>
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
    // prop: "value",
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
      treeConfig: {
        iconOpen: "vxe-icon-square-minus",
        iconClose: "vxe-icon-square-plus",
        expandAll: this.widget.props.tableConfig.baseInfo.treeExpandAll,
        rowField: this.widget.props.tableConfig.baseInfo.treeRowField,
        parentField: this.widget.props.tableConfig.baseInfo.treeParentField,
        accordion: this.widget.props.tableConfig.baseInfo.treeAccordion,
        transform: this.widget.props.tableConfig.baseInfo.treeTransform,
        children: this.widget.props.tableConfig.baseInfo.treeChildrenField,
        checkboxConfig: {
          checkField: "checked",
          halfField: "halfChecked",
          disabledField: "_checkbox_disabled"
        }
      },
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
      defaultItem: {},
      onDataLoadStatus: false
    };
  },
  watch: {
    rows: {
      handler: function(val, oldVal) {
        this.$emit("input", val);
        this.$emit("changeHandle", val);
      },
      deep: true
    },
    "widget.props.isDetail": {
      handler: function(val, oldVal) {
        this.tableConfig.tableList.forEach(e => {
          this.$set(e.props, "isDetail", val);
        });
      },
      deep: true
    },
    "widget.props.value"(val) {
      this.rows = val;
    },
    value: {
      handler: function(val, oldVal) {
        this.rows = val;
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    formatOprateWidth() {
      if (this.baseInfo.oprateWidth) {
        return this.baseInfo.oprateWidth;
      }
      if (this.baseInfo.formTableMode && this.baseInfo.normalTable) {
        return (
          (this.tableConfig.buttonList.filter(
            e => e.props.isSide && !e.props.hide
          ).length +
            1) *
          110
        );
      } else {
        return (
          this.tableConfig.buttonList.filter(
            e => e.props.isSide && !e.props.hide
          ).length * 110
        );
      }
    }
  },
  methods: {
    getSearchParams() {
      var q = this.tableConfig.queryList;
      var baseInfo = this.baseInfo;
      var param = {};
      q.forEach(item => {
        param[item.props.zdname] = item.props.value;
      });
      param[baseInfo.page] = this.pageIndex;
      param[baseInfo.limit] = this.pageSize;
      return param;
    },
    buttonFormat(row, func, type) {
      var fun = new Function("row", "app", func);
      var res = fun(row, this.designer);
      if (res && res.hasOwnProperty(type)) {
        if (type == "type") {
          return res[type] || "primary";
        } else if (type == "show") {
          return res[type] === false ? false : true;
        } else if (type == "disabled") {
          return res[type] === true ? true : false;
        }
      } else {
        if (type == "type") {
          return "primary";
        } else if (type == "show") {
          return true;
        } else if (type == "disabled") {
          return false;
        }
      }
    },
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
    pageChange({ pageSize }) {
      this.pageSize = pageSize;
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
      apiSet.params.forEach(item => {
        if (
          typeof item.value == "string" &&
          item.value.includes("${") &&
          item.value.includes("}")
        ) {
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
      if (apiSet.beforeSend) {
        var fun = new Function("param", "self", "app", apiSet.beforeSend);
        let paramData = this.$utils.clone(param, true);
        var newParam = fun(paramData, this, this.designer);
        if (newParam && typeof newParam == "object") {
          param = newParam;
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
            this.rows = d[baseInfo.rows];
            this.total = d[baseInfo.count];
          }
        } else {
          var fun = new Function("res", "self", "app", apiSet.dataFormat);
          var d = fun(res, this, this.designer);
          if (d) {
            this.rows = d[baseInfo.rows];
            this.total = d[baseInfo.count];
          }
        }

        if (this.widget.props.onDataLoad) {
          this.onDataLoadStatus = true;
          var fun = new Function("self", "app", this.widget.props.onDataLoad);
          fun(this, this.designer);
        }
        this.loading = false;
      });
    },
    setRowsCheckedByIds(ids = []) {
      var find = arr => {
        var newArr = [];
        arr.forEach(item => {
          this.$refs["my_table"].setCheckboxRow(item, false);

          if (ids.includes(item[this.treeConfig.rowField])) {
            this.$refs["my_table"].setCheckboxRow(item, true);
            if (
              item[this.treeConfig.children] &&
              item[this.treeConfig.children].length > 0
            ) {
              this.$refs["my_table"].setCheckboxRow(
                item[this.treeConfig.children],
                false
              );
            }
          }
          if (
            item[this.treeConfig.children] &&
            item[this.treeConfig.children].length > 0
          ) {
            find(item[this.treeConfig.children]);
          }
        });
        return newArr;
      };
      this.$refs["my_table"].setCheckboxRow(find(this.rows), true);
    },
    setAllTreeExpand(expend) {
      this.$nextTick(() => {
        this.$refs["my_table"].setAllTreeExpand(expend);
      });
    },
    chosen() {
      if (this.baseInfo.singleselect) {
        return this.$refs["my_table"].getRadioRecord();
      } else {
        return this.$refs["my_table"].getCheckboxRecords(true);
      }
    },
    halfChosen() {
      return this.$refs["my_table"].getCheckboxIndeterminateRecords(true);
    },
    allTreeChosen() {
      return this.chosen().concat(this.halfChosen());
    },
    setAllCheckboxRow(checked) {
      this.$refs["my_table"].setAllCheckboxRow(checked);
    },
    setRowsCheckedByIndex(arr, checked) {
      var chosenRowsArr = [];
      this.rows.forEach((item, index) => {
        if (arr.includes(index)) {
          chosenRowsArr.push(item);
        }
      });
      this.$refs["my_table"].setCheckboxRow(chosenRowsArr, checked);
    },
    getRows() {
      return this.rows;
    },
    setRows(rows) {
      this.rows = rows;
    },
    setTotal(total) {
      this.total = total;
    },
    setAllTableData(d) {
      var baseInfo = this.baseInfo;
      this.rows = d[baseInfo.rows];
      this.total = d[baseInfo.count];
    },
    clearRow() {
      this.$set(this, "rows", []);
    },
    addRow() {
      var defaultItem = this.$utils.clone(this.defaultItem, true);
      this.rows.push(defaultItem);
      this.activeName = this.rows.length - 1 + "";
    },
    addRowByObject(obj) {
      this.rows.push(obj);
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
        let fun = new Function("app", "row", "zdname", eventStr);
        return fun(this.designer, row, zdname);
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
    
    this.rows = this.value;
    this.tableConfig = this.widget.props.tableConfig;
    this.designer.eventHandle(null, "onCreated", this.widget, this);
    this.init();
    this.pageSize = Number(this.baseInfo.pageDefault);

    if (this.baseInfo.normalTable) {
      var t = this.tableConfig.tableList;

      var find = arr => {
        arr.forEach(item => {
          if (!item.props.hasOwnProperty("defaultValue")) {
            item.props.defaultValue = item.props.value;
          }
          if (
            item.type == "datatable" &&
            item.props.tableConfig.tableList.length
          ) {
            find(item.props.tableConfig.tableList);
          }
        });
      };
      find(t);
      t.forEach(item => {
        this.defaultItem[item.props.zdname] = item.props.defaultValue;
      });
    }
    if (this.baseInfo.initLoadData && this.baseInfo.normalTable !== true) {
      this.getData();
    }
    this.widget.props.tableConfig.tableList.forEach(item => {
      this.$set(item.props, "isDetail", !!this.widget.props.isDetail);
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.my_table.recalculate();
    });
    window.onkeydown = e => {
      if (e.keyCode == 13) {
        this.refresh();
      }
    };
  },
  beforeDestroy() {
    window.onkeydown = null;
  }
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