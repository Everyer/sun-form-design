<template>
  <div
    class="weblist_wrap sun_form_datatable"
    v-loading="loadingWrap"
    :style="{height:widget.props.height||null}"
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
          <div class="query_btn_wrap">
            <div class="btn_wrap">
              <el-button size="mini" type="primary" icon="el-icon-plus" @click="showModal=true">新增</el-button>
            </div>
            <div class="tab_btn_wrap" v-if="!baseInfo.normalTable">
              <el-button @click="reset" icon="el-icon-refresh-left" size="mini">重置</el-button>
              <el-button type="primary" @click="refresh" icon="el-icon-search" size="mini">搜索</el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="table_wrap">
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
          <vxe-table-column align="center" type="seq" title="序号" width="60" field="index"></vxe-table-column>
          <vxe-table-column
            v-for="(item, index) in tableConfig.tableList"
            :key="index"
            :field="item.props.zdname"
            :title="item.props.label"
            :align="baseInfo.align"
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
                  :designer="designer"
                ></component>
              </div>
            </template>
          </vxe-table-column>
          <vxe-table-column :title="'操作'" :align="'center'" :fixed="'right'" :width="200">
            <template #default="{ row ,rowIndex,$rowIndex }">
              <div>
                <el-button
                  size="mini"
                  type="warning"
                  icon="el-icon-circle-check"
                  @click.stop="updateDetailClick(row,$rowIndex)"
                >修改</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-circle-close"
                  @click.stop="deleteClick(row,$rowIndex)"
                >删除</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
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
    <vxe-modal
      v-model="showModal"
      :fullscreen="false"
      width="99.5%"
      height="99%"
      :transfer="true"
      show-footer
      escClosable
      :zIndex="1001"
      :destroy-on-close="true"
      @hide="hideModal"
    >
      <template #title>
        <span>页面设计</span>
      </template>
      <template #default>
        <div class="form_show_wrap" v-loading="loadingModal">
          <formDesigner :baseUrl="apiSet.baseUrl" :headers="apiSet.headers" v-model="widgetList" ref="form_design"></formDesigner>
        </div>
      </template>
      <template #footer>
        <div class="bar_footer">
          <div class="bar_btn_wrap">
            <el-button size="mini" icon="el-icon-close" @click="showModal=false">取消</el-button>
            <el-button size="mini" icon="el-icon-check" type="primary" @click="confirm">保存</el-button>
          </div>
          <div class="bar_comp_wrap required">
            <span>组件名称：</span>
            <el-input size="mini" v-model="formName" placeholder="请填写组件名称"></el-input>
          </div>
          <div class="bar_comp_wrap required">
            <span>组件代码：</span>
            <el-input size="mini" :disabled="!!id" v-model="menuCode" placeholder="请填写组件代码"></el-input>
          </div>
        </div>
      </template>
    </vxe-modal>
  </div>
</template>

<script>
import { createDesigner } from "@/mixins/designer";
import formDesigner from "../formDesigner/index";
export default {
  props: {
    apiSet: {
      type: Object,
      default: () => {
        return {
          headers: {},
          baseUrl:"",
          apiSetList: {
            method: "get",
            apiurl: "",
            params: [],
            contentType: "JSON",
            dataFormat: ""
          },
          apiSetCreate: {
            method: "get",
            apiurl: "",
            params: [],
            contentType: "JSON",
            dataFormat: ""
          },
          apiSetUpdate: {
            method: "get",
            apiurl: "",
            params: [],
            contentType: "JSON",
            dataFormat: ""
          },
          apiSetDetail: {
            method: "get",
            apiurl: "",
            params: [],
            contentType: "JSON",
            dataFormat: ""
          }
        };
      }
    }
  },
  components: { formDesigner },
  name: "sunManage",
  data() {
    return {
      loadingWrap: false,
      loadingModal: false,
      widgetList: [],
      id: null,
      formName: "",
      menuCode: "",
      showModal: false,
      widget: {},
      designer: createDesigner(
        this,
        this.widgetList,
        this.apiSet.headers,
        this.theme
      ),
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
      singleselect: true,
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
      },
      deep: true
    }
  },
  methods: {
    updateDetailClick(row) {
      this.id = row[this.apiSet.configIdKey];

      this.getDetail();
    },
    confirm() {
      if (this.widgetList.length == 0) {
        this.$message.warning("请先添加控件");
        return;
      }
      if (!this.id) {
        this.addData();
      } else {
        this.updateData();
      }
    },
    deleteClick(row) {
      if (!this.apiSet.apiSetDelete.apiurl) {
        this.$message.warning("请配置删除接口");
        return;
      }
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var apiSet = this.$utils.clone(this.apiSet.apiSetDelete, true);
          var method = apiSet.method;
          var param = {};
          param[this.apiSet.configIdKey] = row[this.apiSet.configIdKey];
          apiSet.params.forEach(item => {
            if (item.value.includes("${") && item.value.includes("}")) {
              var funStr = item.value.replace("${", "").replace("}", "");
              var fun = new Function("self", "app", "return " + funStr);
              param[item.label] = fun(this, this.designer);
            } else {
              param[item.label] = item.value;
            }
          });
          if (apiSet.apiurl.includes("{id}")) {
            apiSet.apiurl = apiSet.apiurl.replace("{id}", row.id);
          }
          this.designer.$http[method](this.apiSet.baseUrl+apiSet.apiurl, param)
            .then(res => {
              if (!apiSet.dataFormat) {
                if (res.success || res.code == "0" || res.code == 200) {
                  this.designer.$message.success("删除成功");
                  this.refresh();
                } else {
                  this.designer.$message.error(res.msg);
                }
              } else {
                var fun = new Function("res", "self", "app", apiSet.dataFormat);
                var d = fun(res, this, this.designer);
              }
            })
            .catch(err => {});
        })
        .catch(() => {});
    },
    getDetail() {
      if (!this.apiSet.apiSetDetail.apiurl) {
        this.$message.warning("请配置详情接口");
        return;
      }
      var apiSet = this.$utils.clone(this.apiSet.apiSetDetail, true);
      var method = apiSet.method;
      var param = {};
      param[this.apiSet.configIdKey] = this.id;

      apiSet.params.forEach(item => {
        if (item.value.includes("${") && item.value.includes("}")) {
          var funStr = item.value.replace("${", "").replace("}", "");
          var fun = new Function("self", "app", "return " + funStr);
          param[item.label] = fun(this, this.designer);
        } else {
          param[item.label] = item.value;
        }
      });
      if (apiSet.apiurl.includes("{id}")) {
        apiSet.apiurl = apiSet.apiurl.replace("{id}", this.id);
      }
      this.loadingWrap = true;
      this.designer.$http[method](this.apiSet.baseUrl+apiSet.apiurl, param)
        .then(res => {
          if (!apiSet.dataFormat) {
            if (res.success || res.code == "0" || res.code == 200) {
              if (res.data) {
                this.widgetList = JSON.parse(
                  res.data[this.apiSet.configDataKey]
                );
                this.formName = res.data[this.apiSet.configNameKey];
                this.menuCode = res.data[this.apiSet.configCodeKey];
              }
              this.showModal = true;
            } else {
              this.designer.$message.error(res.msg);
            }
          } else {
            var fun = new Function("res", "self", "app", apiSet.dataFormat);
            var d = fun(res, this, this.designer);
          }
          this.loadingWrap = false;
        })
        .catch(err => {
          this.loadingWrap = false;
        });
    },
    updateData() {
      var apiSet = this.$utils.clone(this.apiSet.apiSetUpdate, true);

      if (!apiSet.apiurl) {
        return this.$message.warning("请先配置新增接口");
      }
      if (!this.formName) {
        return this.$message.warning("请先填写组件名称");
      }
      if (!this.menuCode) {
        return this.$message.warning("请先填写组件代码");
      }
      var method = apiSet.method;
      var param = {
        // formName: this.formName,
        // menuCode: this.menuCode,
        
        // formData: JSON.stringify(this.widgetList)
      };
      param[this.apiSet.configNameKey] = this.formName;
      param[this.apiSet.configCodeKey] = this.menuCode;
      param[this.apiSet.configDataKey] = JSON.stringify(this.widgetList);
      param[this.apiSet.configIdKey] = this.id;
      apiSet.params.forEach(item => {
        if (item.value.includes("${") && item.value.includes("}")) {
          var funStr = item.value.replace("${", "").replace("}", "");
          var fun = new Function("self", "app", "return " + funStr);
          param[item.label] = fun(this, this.designer);
        } else {
          param[item.label] = item.value;
        }
      });
      if (apiSet.apiurl.includes("{id}")) {
        apiSet.apiurl = apiSet.apiurl.replace("{id}", this.id);
      }
      this.loadingModal = true;
      this.designer.$http[method](this.apiSet.baseUrl+apiSet.apiurl, param)
        .then(res => {
          if (!apiSet.dataFormat) {
            if (res.success || res.code == "0" || res.code == 200) {
              this.designer.$message.success("保存成功");
            } else {
              this.designer.$message.error(res.msg);
            }
          } else {
            var fun = new Function("res", "self", "app", apiSet.dataFormat);
            var d = fun(res, this, this.designer);
          }
          this.loadingModal = false;
        })
        .catch(err => {
          this.loadingModal = false;
        });
    },
    addData() {
      var apiSet = this.$utils.clone(this.apiSet.apiSetCreate, true);

      if (!apiSet.apiurl) {
        return this.$message.warning("请先配置新增接口");
      }
      if (!this.formName) {
        return this.$message.warning("请先填写组件名称");
      }
      if (!this.menuCode) {
        return this.$message.warning("请先填写组件代码");
      }
      var method = apiSet.method;
      var param = {
        // formName: this.formName,
        // menuCode: this.menuCode,
        
        // formData: JSON.stringify(this.widgetList)
      };
      param[this.apiSet.configNameKey] = this.formName;
      param[this.apiSet.configCodeKey] = this.menuCode;
      param[this.apiSet.configDataKey] = JSON.stringify(this.widgetList);
      console.log(param,'param');
      apiSet.params.forEach(item => {
        if (item.value.includes("${") && item.value.includes("}")) {
          var funStr = item.value.replace("${", "").replace("}", "");
          var fun = new Function("self", "app", "return " + funStr);
          param[item.label] = fun(this, this.designer);
        } else {
          param[item.label] = item.value;
        }
      });
      if (apiSet.apiurl.includes("{id}")) {
        apiSet.apiurl = apiSet.apiurl.replace("{id}", this.id);
      }
      this.loadingModal = true;

      this.designer.$http[method](this.apiSet.baseUrl+apiSet.apiurl, param)
        .then(res => {
          if (!apiSet.dataFormat) {
            if (res.success || res.code == "0" || res.code == 200) {
              this.designer.$message.success("新增成功");
              this.showModal = false;
            } else {
              this.designer.$message.error(res.msg);
            }
          } else {
            var fun = new Function("res", "self", "app", apiSet.dataFormat);
            var d = fun(res, this, this.designer);
          }
          this.loadingModal = false;
        })
        .catch(err => {
          this.loadingModal = false;
        });
    },
    hideModal() {
      this.widgetList = [];
      this.id = null;
      this.formName = "";
      this.menuCode = "";
      this.refresh();
    },
    add() {},
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
      var apiSet = this.apiSet.apiSetList;
      var method = apiSet.method;
      var baseInfo = apiSet.baseInfo;
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
      this.designer.$http[method](this.apiSet.baseUrl+apiSet.apiurl, param)
        .then(res => {
          if (!apiSet.dataFormat) {
            if (res.success || res.code == "0" || res.code == 200) {
              var d = res.data || res.datas;
            } else {
              this.designer.$message.error(res.msg);
            }
          } else {
            var fun = new Function("res", "self", apiSet.dataFormat);
            var d = fun(res, this);
          }
          this.rows = d[baseInfo.rows];
          this.total = d[baseInfo.count];
          this.loading = false;
        })
        .catch(err => {
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
    },
    removeRow(rowIndex) {
      this.rows.splice(rowIndex, 1);
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
    this.widget = {
      isContainer: false,
      hasLabel: false,
      displayName: "数据表格",
      isForm: true,
      widgetList: [],
      canAddDataTableQuery: false,
      canAddDataTableList: false,
      props: {
        zdname: null,
        label: "数据表格",
        labelAlign: "center",
        labelWidth: "70px",
        width: 24,
        height: "100%",
        apiSet: {
          method: "post",
          apiurl: "/inputList/selectPage",
          params: [],
          contentType: "JSON",
          dataFormat: ""
        },
        tableConfig: {
          baseInfo: {
            rows: "records",
            count: "total",
            page: "pageIndex",
            limit: "pageSize",
            pageDefault: "10",
            singleselect: true,
            align: "center",
            hasPage: true,
            showOverFlow: true,
            initLoadData: true,
            isStripe: false
          },
          buttonList: [],
          queryList: [
            {
              isContainer: false,
              displayName: "输入框",
              hasLabel: true,
              isForm: true,
              canAddDataTableQuery: true,
              canAddDataTableList: true,
              props: {
                size: "medium",
                required: false,
                readonly: false,
                disabled: false,
                hide: false,
                placeholder: "请输入",
                labelPosition: "left",
                value: null,
                zdname: this.apiSet.configNameKey,
                label: "配置名称",
                labelAlign: "right",
                labelWidth: "120px",
                width: 6,
                onCreated: null,
                onMounted: null,
                onInput: null,
                onChange: null,
                onFocus: null,
                onBlur: null,
                id: "query-item-5466043"
              },
              type: "input",
              id: "query-item-5466043",
              parentType: "datatable",
              _X_ROW_KEY: "row_1468"
            },
            {
              isContainer: false,
              displayName: "输入框",
              hasLabel: true,
              isForm: true,
              canAddDataTableQuery: true,
              canAddDataTableList: true,
              props: {
                size: "medium",
                required: false,
                readonly: false,
                disabled: false,
                hide: false,
                placeholder: "请输入",
                labelPosition: "left",
                value: null,
                zdname: this.apiSet.configCodeKey,
                label: "配置代码",
                labelAlign: "right",
                labelWidth: "120px",
                width: 6,
                onCreated: null,
                onMounted: null,
                onInput: null,
                onChange: null,
                onFocus: null,
                onBlur: null,
                id: "query-item-7668386"
              },
              type: "input",
              id: "query-item-7668386",
              parentType: "datatable",
              _X_ROW_KEY: "row_287"
            }
          ],
          tableList: [
            {
              isContainer: false,
              hasLabel: false,
              displayName: "数据表格表头",
              isForm: true,
              widgetList: [],
              canAddDataTableQuery: false,
              canAddDataTableList: true,
              addToPanel: false,
              props: {
                zdname: this.apiSet.configNameKey,
                label: "配置名称",
                tableitemWidth: null,
                onCreated: null,
                onMounted: null,
                onFormat: null,
                id: "query-item-6485464"
              },
              type: "datatableitem",
              id: "query-item-6485464",
              parentType: "datatable",
              _X_ROW_KEY: "row_53"
            },
            {
              isContainer: false,
              hasLabel: false,
              displayName: "数据表格表头",
              isForm: true,
              widgetList: [],
              canAddDataTableQuery: false,
              canAddDataTableList: true,
              addToPanel: false,
              props: {
                zdname: this.apiSet.configCodeKey,
                label: "配置代码",
                tableitemWidth: null,
                onCreated: null,
                onMounted: null,
                onFormat: null,
                id: "query-item-6486778"
              },
              type: "datatableitem",
              id: "query-item-6486778",
              parentType: "datatable",
              _X_ROW_KEY: "row_54"
            }
          ]
        },
        onCreated: null,
        onMounted: null,
        id: "datatable-9923947"
      },
      type: "datatable",
      active: true,
      id: "datatable-9923947"
    };
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
  },
  mounted() {
    var that = this;
    document.onkeydown = function(event) {
      if (event.ctrlKey == true && event.keyCode == 83) {
        event.preventDefault();
        event.returnvalue = false;
        if (that.showModal) {
          that.confirm();
        }
      }
    };
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
.form_show_wrap {
  width: 100%;
  height: 100%;
}
.row--checked {
  background: #409eff !important;
  color: #ffffff !important;
}
.bar_footer {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  .bar_comp_wrap {
    display: flex;
    align-items: center;
    margin-right: 20px;
    span {
      flex: 0 0 70px;
    }
  }
}
.required::before {
  color: #f56c6c;
  content: "*";
  display: inline-block;
  margin-right: 4px;
}
::v-deep {
  
  .query_item {
    .container_wrapper {
      border: none;
      .widget_item_wrap {
        .lab {
          display: none;
        }
      }
    }
  }
  .vxe-modal--footer {
    // border-top: 1px solid red;
    box-shadow: 3px 0px 10px 1px #ccc;
  }
}
</style>