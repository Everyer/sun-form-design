<template>
  <div class="form_widget_container">
    <draggable
      :list="designer.widgetList"
      v-bind="{group:'dragGroup', ghostClass: 'ghost',animation: 300}"
      handle=".drag-handler"
      @end="onDragEnd"
      @add="onDragAdd"
      @update="onDragUpdate"
      :move="checkMove"
      class="drag_wrapper"
    >
      <template v-for="(item, index) in designer.widgetList">
        <div class="form_widget_item" :style="{width:4.16667*item.props.width+'%'}">
          <component
            :parent-list="designer.widgetList"
            :ref="item.id"
            :is="'widget-'+item.type"
            :widget="item"
            :key="item.id"
            :designer="designer"
          ></component>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
export default {
  components: { Draggable },
  name: "formWidget",
  props: {
    designer: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    selectWidget(widget) {},
    onDragEnd(evt) {},
    onDragAdd(evt) {},
    onDragUpdate(evt) {},
    checkMove(evt) {}
  },
  created() {},
  mounted() {}
};
</script>

<style scoped lang="scss">
.form_widget_container {
}
.form_widget_item {
  width: 100%;
  box-sizing: border-box;
  float: left;
  padding: 5px;
  box-sizing: border-box;
}
.drag_wrapper {
  min-height: 80vh;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
</style>