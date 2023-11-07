<template>
  <container-wrapper
    :class="'sun_div_wrap sun_form_theme_'+designer.theme"
    :widget="widget"
    :designer="designer"
    :parentList="parentList"
  >
    <draggable
      :list="widget.widgetList"
      v-bind="{group:'dragGroup', ghostClass: 'ghost',animation: 300}"
      class="drag_wrapper"
      handle=".drag-handler"
      :class="{widget_hide:widget.props.hide}"
      :disabled="designer.formMode"
    >
      <!-- <form-mode-wrapper :designer="designer"> -->
        <div
          class="widget_item"
          :class="{'widget_item_div':widget.props.type=='div'}"
          :style="designer.formatStyle(item)"
          v-show="!item.props.hide"
          v-for="(item, index) in widget.widgetList"
          :key="index"
        >
          <component
            :parent-list="widget.widgetList"
            :is="'widget-'+item.type"
            :widget="item"
            :key="item.id"
            :designer="designer"
          ></component>
        </div>
      <!-- </form-mode-wrapper>
      <design-form-wrapper :designer="designer">
        <div
          class="widget_item"
          :class="{'widget_item_div':widget.props.type=='div'}"
          :style="designer.formatStyle(item)"
          v-for="(item, index) in widget.widgetList"
          :key="index"
        >
          <component
            :parent-list="widget.widgetList"
            :is="'widget-'+item.type"
            :widget="item"
            :key="item.id"
            :designer="designer"
          ></component>
        </div>
      </design-form-wrapper> -->
    </draggable>
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
  name: "widget-div",
  data() {
    return {
      that: this
    };
  },
  watch: {},
  methods: {},
  created() {
    this.designer.eventHandle(null, "onCreated", this.widget, this);
  },
  mounted() {
    this.designer.eventHandle(null, "onMounted", this.widget, this);
  }
};
</script>

<style scoped lang="scss">
.sun_div_wrap {
  width: 100%;
  height: 100%;
  .drag_wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
  }
  .widget_item {
  }
}
::v-deep {
  .sun_div_wrap {
  }
}
</style>