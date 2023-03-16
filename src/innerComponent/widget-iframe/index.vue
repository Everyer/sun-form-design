<template>
  <container-wrapper
    :widget="widget"
    :designer="designer"
    class="sun_form_service"
    :parentList="parentList"
  >
    <div :style="{width:4.16667*widget.props.width+'%'}" class="sun_form_service_wrap">
      <iframe
        v-if="widget.props.src"
        :style="{width:'100%',height:widget.props.height}"
        :src="widget.props.src"
        frameborder="0"
      ></iframe>
    </div>
  </container-wrapper>
</template>

<script>
export default {
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
  name: "widget-iframe",
  data() {
    return {
      widgetList: [],
      that: this,
      app: null
    };
  },
  methods: {},
  watch: {},
  created() {
    this.designer.eventHandle(null, "onCreated", this.widget, this);
  },
  mounted() {
    this.designer.eventHandle(null, "onMounted", this.widget, this);
  }
};
</script>

<style scoped lang="scss">
.sun_form_service {
  padding: 20px;
}
.sun_form_service_wrap {
  width: 100%;
  min-height: 40px;
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
}
.grid_btn_wrap {
  display: flex;
  padding: 10px 10px;
  flex-direction: row-reverse;
  border: 1px solid #f0f0f0;
  background: #fafafa;
  border-radius: 0px 0px 5px 5px;
}
</style>