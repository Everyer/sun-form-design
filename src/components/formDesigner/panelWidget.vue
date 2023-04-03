<template>
  <div class="side_wrap">
    <div class="item_wrap">
      <div class="title">容器控件</div>
      <div class="content">
        <draggable
          :list="containerData"
          :group="{name: 'dragGroup', pull: 'clone', put: false}"
          v-bind="{ ghostClass: 'ghost2',animation: 300}"
          :sort="false"
          :clone="handleWidgetClone"
          class="drag_wrapper_2"
        >
          <div class="item" v-for="(item, index) in containerData" :key="index">
            <i :class="`iconfont icon-${item.type}`"></i>
            {{item.displayName}}
          </div>
        </draggable>
      </div>
    </div>
    <div class="item_wrap">
      <div class="title">表单控件</div>
      <div class="content">
        <draggable
          :list="widgetData"
          :group="{name: 'dragGroup', pull: 'clone', put: false}"
          v-bind="{ ghostClass: 'ghost2',animation: 300}"
          :clone="handleWidgetClone"
          :sort="false"
          class="drag_wrapper_2"
        >
          <div class="item" v-for="(item, index) in widgetData" :key="index">
            <!-- <i class="el-icon-rank"></i> -->
            <i :class="`iconfont icon-${item.type}`"></i>
            {{item.displayName}}
          </div>
        </draggable>
      </div>
    </div>
    <div class="item_wrap">
      <div class="title">其他控件</div>
      <div class="content">
        <draggable
          :list="uiData"
          :group="{name: 'dragGroup', pull: 'clone', put: false}"
          v-bind="{ ghostClass: 'ghost2',animation: 300}"
          :clone="handleWidgetClone"
          :sort="false"
          class="drag_wrapper_2"
        >
          <div class="item" v-for="(item, index) in uiData" :key="index">
            <!-- <i class="el-icon-rank"></i> -->
            <i :class="`iconfont icon-${item.type}`"></i>
            {{item.displayName}}
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
import designer from "@/mixins/designer";
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
  components: { Draggable },
  name: "panelWidget",
  data() {
    return {
      containerData: [],
      widgetData: [],
      uiData: []
    };
  },
  methods: {
    handleWidgetClone(data) {
      this.designer.chosenWidget = null;
      this.designer.clearAllActive();
      data.active = true;
      var data = this.designer.formatWidget(data);
      return data;
    }
  },
  created() {
    for (var i in widgetConfig) {
      widgetConfig[i].type = i;
      if (widgetConfig[i].addToPanel !== false) {
        if (widgetConfig[i].isContainer) {
          this.containerData.push(widgetConfig[i]);
        } else if (widgetConfig[i].isForm) {
          this.widgetData.push(widgetConfig[i]);
        } else {
          this.uiData.push(widgetConfig[i]);
        }
      }
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
@import url("../../assets/font/iconfont.css");
.side_wrap {
  .logo {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 5px 0 10px;
    user-select: none;
    img {
      width: 50%;
    }
  }
  .item_wrap {
    .title {
      font-size: 14px;
      margin-top: 0;
      color: #333;
      padding: 10px;
      box-sizing: border-box;
      font-style: italic;
      font-weight: bold;
      border-bottom: 1px solid #2468f2;
    }
    .content {
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
      box-sizing: border-box;
      justify-content: space-between;
      // .item {
      //   width: 48%;
      //   background: #f1f2f3;
      //   margin: 10px 0;
      //   box-sizing: border-box;
      //   padding: 5px 10px;
      //   font-size: 12px;
      // }
    }
  }
}
.drag_wrapper_2 {
  display: flex;
  flex-wrap: wrap;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  .item {
    display: flex;
    align-items: center;
    max-height: 34px;
    width: 48%;
    margin: 6px 0;
    box-sizing: border-box;
    padding: 8px 10px;
    font-size: 12px;
    cursor: pointer;
    border: 1px solid #e8e9eb;
    border-radius: 4px;
    transition: all 0.2s;
    color: rgba(0, 0, 0, 0.85);
    i {
      margin-right: 3px;
      transition: all 0.2s;
      font-size: 14px;
      color: #409eff;
      transform: translateY(0px);
    }
    &:hover {
      border-color: #2468f2;
      color: #2468f2;

      i {
        color: #2468f2;
      }
    }
  }
}
</style>