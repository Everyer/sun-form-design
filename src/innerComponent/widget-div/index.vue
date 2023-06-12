<template>
  <container-wrapper
    :class="'div_wrap sun_form_theme_'+designer.theme"
    :widget="widget"
    :designer="designer"
    :parentList="parentList"
  >
    <draggable
      :list="widget.widgetList"
      v-bind="{group:'dragGroup', ghostClass: 'ghost',animation: 300}"
      class="drag_wrapper"
      :style="{width:widget.props.divWidth,height:widget.props.divHeight}"
      handle=".drag-handler"
      :disabled="designer.formMode"
    >
      <div
        class="widget_item"
        :style="{width:4.16667*item.props.width+'%'}"
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
  watch: {
    "widget.props.formType": {
      handler(val) {
        var isDetail = val == "Detail";
        var find = widgetList => {
          for (var i = 0; i < widgetList.length; i++) {
            var item = widgetList[i];
            if (item.props.hasOwnProperty("isDetail")) {
              this.$set(item.props, "isDetail", isDetail);
            }
            if (item && item.widgetList && item.widgetList.length > 0) {
              find(item.widgetList);
            }
          }
        };
        find(this.widget.widgetList);
      },
      immediate: true
    }
  },
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
</style>