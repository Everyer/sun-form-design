<template>
  <div
    class="container_wrapper"
    :class="{active:widget.active&&!designer.formMode&&!widget.parentType}"
    v-if="(designer.formMode&&!widget.props.hide)||!designer.formMode"
    @click.stop="clickWrapHandle(widget.active&&!designer.formMode&&!widget.parentType)"
  >
    <slot></slot>
    <div class="drag-handler">
      <i class="el-icon-rank"></i>
      {{widget.displayName}}
    </div>
    <div class="drag-tools">
      <div class="tools_item" @click="copy">
        <i class="el-icon-document-copy"></i>
      </div>
      <div class="tools_item" @click="del">
        <i class="el-icon-delete"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    widget: {
      type: Object,
      default: ""
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
    },
  },
  components: {},
  name: "container-wrapper",
  data() {
    return {};
  },
  methods: {
    copy() {
      var w = this.$utils.clone(this.widget, true);
      var p = this.parentList;
      var id = w.id;
      var index = p.findIndex(item => item.id == id);
      var id = w.type + "-" + Math.floor(new Date().getTime() % 10000000);
      w.id = id;
      this.widget.active=false;
      w.props.id = id;
      w.props.value = null;
      w.props.zdname = null;

      var findForm = function(widgetList) {
        for (var i = 0; i < widgetList.length; i++) {
          var item = widgetList[i];
          var itemid =
            item.type + "-" + Math.floor(new Date().getTime() % 10000000+(i+1)*2);
          item.id = itemid;
          item.props.id = itemid;
          item.props.value = null;
          item.props.zdname = null;
          if (item.widgetList && item.widgetList.length) {
            findForm(item.widgetList);
          }
        }
      };
      if(w.widgetList&&w.widgetList.length){
        findForm(w.widgetList);
      }
      w.active=true
      p.splice(index + 1, 0, w);
    },
    del() {
      var p = this.parentList;
      var id = this.widget.id;
      var index = p.findIndex(item => item.id == id);
      p.splice(index, 1);
      if (p.length) {
        this.$set(p[0], "active", true);
      }
    },
    clickWrapHandle(notActive) {
      if (notActive) {
        return;
      }
      this.designer.clearAllActive();
      this.$set(this.widget, "active", true);
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped lang="scss">
.container_wrapper {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  box-sizing: border-box;
  border: 1px dashed #e2e0e0;
  padding: 3px;
  padding: 10px 10px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  .drag-handler {
    display: none;
    position: absolute;
    z-index: 1;
    background: #40a0ffba;
    color: #ffffff;
    left: -1px;
    top: -1px;
    font-size: 12px;
    padding: 3px;
  }
  .drag-tools {
    display: none;
    position: absolute;
    right: 8px;
    bottom: -10px;

    .tools_item {
      background: #ffffff;
      border: 1px solid #40a0ff;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      margin: 0 3px;
      cursor: pointer;
      &:hover {
        background: #40a0ff;
        border: 1px solid #40a0ff;
        i {
          color: #ffffff;
        }
      }
      i {
        font-size: 12px;
        color: #40a0ff;
      }
    }
  }
}
.active {
  border: 2px solid #40a0ffa0;
  box-sizing: border-box;
  // background: #40a0ff28;
  border-radius: 0px;
  & > .drag-handler {
    display: block;
  }
  & > .drag-tools {
    display: flex;
  }
}
</style>