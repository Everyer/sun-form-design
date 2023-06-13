<template>
  <container-wrapper
    :class="'sun_form_theme_'+designer.theme"
    :widget="widget"
    :designer="designer"
    class="widget_tabs_wrap"
    :parentList="parentList"
    v-loading="loading"
  >
    <div class="widget_item" :style="{width:4.16667*widget.props.width+'%'}">
      <el-tabs
        class="sy_tabs sun_form_tabs"
        :type="widget.props.type"
        v-model="widget.props.activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          v-for="(item, index) in widget.props.tabs"
          :key="item.value"
          :label="item.label"
          :name="item.value"
        >
          <draggable
            :list="item.widgetList"
            v-bind="{group:'dragGroup', ghostClass: 'ghost',animation: 300}"
            :disabled="designer.formMode"
            class="drag_wrapper"
            handle=".drag-handler"
          >
            <div
              class="widget_item"
              v-for="(item2, index2) in item.widgetList"
              :style="designer.formatStyle(item)"
              :key="index2"
              v-if="widget.props.loadType=='loadAll'?true: item.value === widget.props.activeName"
            >
              <component
                :parent-list="item.widgetList"
                :is="'widget-'+item2.type"
                :widget="item2"
                :key="item2.id"
                :designer="designer"
              ></component>
            </div>
          </draggable>
        </el-tab-pane>
      </el-tabs>
    </div>
  </container-wrapper>
</template>

<script>
import Draggable from "vuedraggable";
export default {
  components: { Draggable },
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
  name: "widget-tabs",
  data() {
    return {
      that: this,
      loading: false,
      loadingWrap: false
    };
  },
  methods: {
    handleClick(tab, event) {
      this.designer.eventHandle(
        this.widget.props.activeName,
        "onChange",
        this.widget,
        this
      );
    }
  },
  watch: {
    "widget.props.tabs.length": {
      handler(val, oldVal) {
        if (val) {
          this.widget.props.activeName = this.widget.props.tabs[0].value;
        }
      },
      immediate: true
    }
  },
  created() {
    this.designer.eventHandle(null, "onCreated", this.widget, this);
    if (this.widget.props.tabs.length) {
      this.widget.props.activeName = this.widget.props.tabs[0].value;
    }
  },
  mounted() {
    this.designer.eventHandle(null, "onMounted", this.widget, this);
  }
};
</script>

<style scoped lang="scss">
.widget_tabs_wrap {
  padding-top: 25px;
}
.widget_item {
  box-sizing: border-box;
  width: 100%;
  margin: 10px 0;
  min-height: 50px;
}
.drag_wrapper {
  min-height: 50px;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding: 10px;
}
.grid_btn_wrap {
  display: flex;
  padding: 10px 10px;
  flex-direction: row-reverse;
  border: 1px solid #f0f0f0;
  background: #fafafa;
  border-radius: 0px 0px 5px 5px;
}
.sy_tabs {
  width: 100%;
}
</style>