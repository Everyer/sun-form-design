<template>
  <div class="sy_wrap">
    <div class="item">
      <div class="lab">表格高度</div>
      <div class="con">
        <el-input v-model="designer.chosenWidget.props.height" size="mini"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="lab">操作栏宽度</div>
      <div class="con">
        <el-input
          v-model="designer.chosenWidget.props.tableConfig.baseInfo.oprateWidth"
          placeholder="不填则按默认宽度"
          size="mini"
        ></el-input>
      </div>
    </div>
    <div class="item" v-if="!designer.chosenWidget.props.tableConfig.baseInfo.normalTable">
      <div class="lab">数据key</div>
      <div class="con">
        <el-input v-model="designer.chosenWidget.props.tableConfig.baseInfo.rows" size="mini"></el-input>
      </div>
    </div>

    <div class="item" v-if="!designer.chosenWidget.props.tableConfig.baseInfo.normalTable">
      <div class="lab">总数key</div>
      <div class="con">
        <el-input v-model="designer.chosenWidget.props.tableConfig.baseInfo.count" size="mini"></el-input>
      </div>
    </div>
    <div class="item" v-if="!designer.chosenWidget.props.tableConfig.baseInfo.normalTable">
      <div class="lab">分页key</div>
      <div class="con">
        <el-input v-model="designer.chosenWidget.props.tableConfig.baseInfo.page" size="mini"></el-input>
      </div>
    </div>
    <div class="item" v-if="!designer.chosenWidget.props.tableConfig.baseInfo.normalTable">
      <div class="lab">页数key</div>
      <div class="con">
        <el-input v-model="designer.chosenWidget.props.tableConfig.baseInfo.limit" size="mini"></el-input>
      </div>
    </div>
    <div class="item" v-if="!designer.chosenWidget.props.tableConfig.baseInfo.normalTable">
      <div class="lab">默认页数</div>
      <div class="con">
        <el-input
          v-model="designer.chosenWidget.props.tableConfig.baseInfo.pageDefault"
          size="mini"
        ></el-input>
      </div>
    </div>
    <div class="item">
      <div class="lab">对齐方式</div>
      <div class="con">
        <el-select
          size="mini"
          v-model="designer.chosenWidget.props.tableConfig.baseInfo.align"
          placeholder="请选择"
        >
          <el-option label="中间" value="center"></el-option>
          <el-option label="左侧" value="left"></el-option>
          <el-option label="右侧" value="right"></el-option>
        </el-select>
      </div>
    </div>
    <div class="item" v-if="designer.chosenWidget.props.tableConfig.baseInfo.normalTable">
      <div class="lab">是否必填</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.required"></el-switch>
      </div>
    </div>
    <div class="item" v-if="!designer.chosenWidget.props.tableConfig.baseInfo.normalTable">
      <div class="lab">是否单选</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.tableConfig.baseInfo.singleselect"></el-switch>
      </div>
    </div>
    <div class="item" v-if="!designer.chosenWidget.props.tableConfig.baseInfo.normalTable">
      <div class="lab">是否分页</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.tableConfig.baseInfo.hasPage"></el-switch>
      </div>
    </div>
    <div class="item" v-if="!designer.chosenWidget.props.tableConfig.baseInfo.normalTable">
      <div class="lab">初始加载数据</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.tableConfig.baseInfo.initLoadData"></el-switch>
      </div>
    </div>
    <div class="item" v-if="!designer.chosenWidget.props.tableConfig.baseInfo.normalTable">
      <div class="lab">内容过长隐藏</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.tableConfig.baseInfo.showOverFlow"></el-switch>
      </div>
    </div>
    <div class="item">
      <div class="lab">是否有斑马线</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.tableConfig.baseInfo.isStripe"></el-switch>
      </div>
    </div>
    <div class="item" v-if="designer.chosenWidget.props.tableConfig.baseInfo.normalTable">
      <div class="lab">隐藏编辑按钮</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.tableConfig.baseInfo.hideEditButton"></el-switch>
      </div>
    </div>
    <div class="item">
      <div class="lab">是否从表表格</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.tableConfig.baseInfo.normalTable"></el-switch>
      </div>
    </div>
    <div class="item" v-if="designer.chosenWidget.props.tableConfig.baseInfo.treeMode">
      <div class="lab">本级树节点</div>
      <div class="con">
        <el-input
          v-model="designer.chosenWidget.props.tableConfig.baseInfo.treeRowField"
          size="mini"
        ></el-input>
      </div>
    </div>
    <div class="item" v-if="designer.chosenWidget.props.tableConfig.baseInfo.treeMode">
      <div class="lab">父级树节点</div>
      <div class="con">
        <el-input
          v-model="designer.chosenWidget.props.tableConfig.baseInfo.treeParentField"
          size="mini"
        ></el-input>
      </div>
    </div>
    <div class="item" v-if="designer.chosenWidget.props.tableConfig.baseInfo.treeMode">
      <div class="lab">树子节点容器</div>
      <div class="con">
        <el-input
          v-model="designer.chosenWidget.props.tableConfig.baseInfo.treeChildrenField"
          size="mini"
        ></el-input>
      </div>
    </div>
    <div class="item">
      <div class="lab">是否树形表格</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.tableConfig.baseInfo.treeMode"></el-switch>
      </div>
    </div>

    <div class="item" v-if="designer.chosenWidget.props.tableConfig.baseInfo.treeMode">
      <div class="lab">是否扁平数据</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.tableConfig.baseInfo.treeTransform"></el-switch>
      </div>
    </div>

    <div class="item" v-if="designer.chosenWidget.props.tableConfig.baseInfo.treeMode">
      <div class="lab">是否展开全部</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.tableConfig.baseInfo.treeExpandAll"></el-switch>
      </div>
    </div>
    <div class="item" v-if="designer.chosenWidget.props.tableConfig.baseInfo.treeMode">
      <div class="lab">是否手风琴</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.tableConfig.baseInfo.treeAccordion"></el-switch>
      </div>
    </div>
    <div class="item">
      <div class="lab">是否隐藏</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.hide"></el-switch>
      </div>
    </div>
    <div class="item" v-show="designer.chosenWidget.props.tableConfig.baseInfo.normalTable">
      <div class="lab">从表显示模式</div>
      <div class="con">
        <el-radio-group
          v-model="designer.chosenWidget.props.tableConfig.baseInfo.formTableMode"
          size="mini"
        >
          <el-radio label="table">表格</el-radio>
          <el-radio label="tab">标签</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="item">
      <div class="lab">JSON生成表格</div>
      <div class="con">
        <el-button :type="'info'" plain size="mini" round @click="createForm">导入JSON</el-button>
      </div>
    </div>
    <vxe-modal
      v-model="showCode"
      :fullscreen="false"
      width="1000px"
      show-footer
      height="80%"
      :transfer="true"
      :destroy-on-close="true"
    >
      <template #title>
        <span>根据导入JSON生成表单</span>
      </template>
      <template #default>
        <div class="form_show_wrap" style="height:100%">
          <common-code-editor
            ref="codeEditor"
            lang="javascript"
            :readonly="false"
            height="100%"
            v-model="jsonCode"
          ></common-code-editor>
        </div>
      </template>
      <template #footer>
        <el-button size="mini" icon="el-icon-close" @click="showCode=false">取消</el-button>
        <el-button size="mini" icon="el-icon-check" type="primary" @click="confirmJson">确定</el-button>
      </template>
    </vxe-modal>
  </div>
</template>

<script>
import widgetConfig from "@/mixins/widgetConfig";

export default {
  props: {
    designer: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: {},
  name: "config-datatable",
  data() {
    return {
      showCode: false,
      jsonCode: ""
    };
  },
  methods: {
    createForm() {
      this.showCode = true;
    },
    confirmJson() {
      let d = JSON.parse(this.jsonCode);
      let num = 1;
      let arr = [];
      d.forEach(e => {
        num++;
        let widget = this.designer.formatWidget(widgetConfig[e.kjlx]);
        widget.id += num;
        widget.props.id += num;
        widget.props.zdname = e.zdname;
        widget.props.label = e.description;
        widget.props.tableitemWidth = 150;
        widget.active = false;
        arr.push(widget);
      });
      this.designer.chosenWidget.props.tableConfig.tableList = arr;
      this.showCode = false;
      this.jsonCode = "";
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped lang="scss">
</style>