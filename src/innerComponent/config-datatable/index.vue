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
  </div>
</template>

<script>
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
    return {};
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style scoped lang="scss">
</style>