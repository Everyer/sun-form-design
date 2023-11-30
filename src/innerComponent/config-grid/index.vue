<template>
  <div class="sy_wrap">
    <div class="item">
      <div class="lab">表单类型</div>
      <div class="con">
        <el-select size="mini" v-model="designer.chosenWidget.props.formType" placeholder="请选择">
          <el-option label="Create" value="Create"></el-option>
          <el-option label="Update" value="Update"></el-option>
          <el-option label="Detail" value="Detail"></el-option>
        </el-select>
      </div>
    </div>
    <div class="item">
      <div class="lab">是否隐藏按钮</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.hideButton"></el-switch>
      </div>
    </div>
    <div class="item">
      <div class="lab">新增接口配置</div>
      <div class="con">
        <common-http-set :designer="designer" v-model="designer.chosenWidget.props.apiSetCreate"></common-http-set>
      </div>
    </div>
    <div class="item">
      <div class="lab">修改接口配置</div>
      <div class="con">
        <common-http-set :designer="designer" v-model="designer.chosenWidget.props.apiSetUpdate"></common-http-set>
      </div>
    </div>
    <div class="item">
      <div class="lab">详情接口配置</div>
      <div class="con">
        <common-http-set :designer="designer" v-model="designer.chosenWidget.props.apiSetDetail"></common-http-set>
      </div>
    </div>
    <div class="item">
      <div class="lab">JSON生成表单</div>
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
  name: "config-grid",
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
        widget.props.required = e.required;
        widget.active = false;
        // widget.props=d[i];
        arr.push(widget);
      });
      this.designer.chosenWidget.widgetList = arr;
      this.showCode = false;
      this.jsonCode = "";
      // for (let i in d) {
      //   num++;
      //   let widget = this.designer.formatWidget(widgetConfig["input"]);
      //   widget.id += num;
      //   widget.props.id += num;
      //   widget.props.zdname = i;
      //   widget.props.label = i;
      //   widget.active = false;
      //   console.log(widget);
      //   // widget.props=d[i];
      //   this.designer.chosenWidget.widgetList.push(widget);
      // }
      // console.log(this.designer.chosenWidget.widgetList);
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped lang="scss">
</style>