<template>
  <container-wrapper :widget="widget" :designer="designer" :parentList="parentList">
    <div
      class="widget_item_wrap"
      :class="{widget_item_wrap_top:widget.props.labelPosition=='top',widget_hide:widget.props.hide}"
    >
      <div
        class="lab"
        v-show="false"
        :class="{required:widget.props.required}"
        :style="{width:widget.props.labelWidth,textAlign:widget.props.labelAlign,flex:`0 0 ${widget.props.labelWidth}`}"
      >{{widget.props.label}}</div>
      <div class="con">
          <!-- @click="tableItemData?designer.eventHandle($event,'onTableBtnClick',widget,that,tableItemData):designer.eventHandle($event,'onClick',widget,that)" -->
        <el-button
          @click="clickHandle"
          :type="widget.props.type"
          :size="widget.props.size"
          :icon="widget.props.icon"
          :plain="widget.props.isPlain"
          :round="widget.props.isRound"
          :disabled="widget.props.disabled"
        >{{designer.eventHandle(null,'onFormatName',widget,that,tableItemData)||widget.props.buttonText}}</el-button>
      </div>
    </div>
  </container-wrapper>
</template>

<script>
export default {
  components: {},
  model: {
    event: "change"
  },
  props: {
    tableItemData: {
      type: [String, Number, Boolean, Array, Object],
      default: null
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
    parentList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  name: "widget-button",
  data() {
    return {
      that: this
    };
  },
  methods: {
    clickHandle(){
        if(this.tableItemData){
            this.designer.eventHandle(null,'onTableBtnClick',this.widget,this,this.tableItemData)
        }else{
            this.designer.eventHandle(null,'onClick',this.widget,this)
        }
    }
  },
  created() {
    this.designer.eventHandle(null, "onCreated", this.widget, this);
  },
  mounted() {
    this.designer.eventHandle(null, "onMounted", this.widget, this);
  }
};
</script>

<style scoped lang="scss">
</style>