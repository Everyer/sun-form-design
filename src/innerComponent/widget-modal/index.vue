<template>
  <container-wrapper
    class="sun_form_modal"
    :widget="widget"
    :designer="designer"
    :parentList="parentList"
  >
    <design-form-wrapper :designer="designer">
      <div class="modal_wrapper">
        <div class="modal_head">
          <div class="modal_title">{{widget.props.title}}</div>
        </div>
        <div class="modal_content">
          <draggable
            :list="widget.widgetList"
            v-bind="{group:'dragGroup', ghostClass: 'ghost',animation: 300}"
            class="drag_wrapper"
            :disabled="designer.formMode"
            handle=".drag-handler"
          >
            <div
              class="widget_item"
              :style="designer.formatStyle(item)"
              v-for="(item, index) in widget.widgetList"
              v-if="!item.props.hide"
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
        </div>
        <div class="modal_footer" v-if="widget.props.hasFooter">
          <div class="modal_footer_btn">
            <el-button
              size="mini"
              v-for="(item, index) in widget.props.list"
              :key="index"
            >{{item.label}}</el-button>
            <el-button size="mini" v-if="!widget.props.hideCancel">取消</el-button>
            <el-button size="mini" v-if="!widget.props.hideConfirm" type="primary">确定</el-button>
          </div>
        </div>
      </div>
    </design-form-wrapper>

    <form-mode-wrapper :designer="designer">
      <vxe-modal
        v-model="widget.props.show"
        :fullscreen="false"
        :width="widget.props.modalWidth"
        :height="widget.props.modalHeight"
        :show-footer="widget.props.hasFooter"
        :transfer="true"
        :destroy-on-close="true"
        @hide="hideModel"
        @show="designer.eventHandle($event,'onShow',widget,that)"
      >
        <template #title>
          <span>{{widget.props.title}}</span>
        </template>
        <template #default>
          <div class="form_mode" :class="'sun_form_theme_'+designer.theme">
            <div>
              <div
                class="widget_item"
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
            </div>
          </div>
        </template>
        <template #footer>
          <el-button
            size="mini"
            v-for="(item, index) in widget.props.list"
            @click="btnClick(item)"
            :key="index"
          >{{item.label}}</el-button>
          <el-button size="mini" v-if="!widget.props.hideCancel" @click="widget.props.show=false">取消</el-button>
          <el-button size="mini" v-if="!widget.props.hideConfirm" @click="confirm" type="primary">确定</el-button>
        </template>
      </vxe-modal>
    </form-mode-wrapper>
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
  name: "widget-modal",
  data() {
    return {
      defaultWidget: null,
      that: this
    };
  },
  methods: {
    btnClick(item) {
      var key = item.value;
      var func = new Function(
        "key",
        "self",
        "app",
        this.widget.props.onButtonClick
      );
      func(key, this, this.designer);
    },
    confirm() {
      this.designer.eventHandle(null, "onConfirm", this.widget, this);
    },
    open(cb) {
      this.widget.props.show = true;
      this.defaultWidget = this.$utils.clone(this.widget, true);
      this.$nextTick(() => {
        cb && cb();
      });
    },
    close(cb) {
      this.widget.props.show = false;
      cb && cb();
    },
    hideModel() {
      this.widget.props.show = false;
      this.widget.widgetList = this.$utils.clone(
        this.defaultWidget.widgetList,
        true
      );
      // this.designer.resetForm(this.widget.id);
      this.designer.eventHandle(null, "onHide", this.widget, this);
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
.widget_item {
  box-sizing: border-box;
  width: 100%;
  min-height: 50px;
  padding: 5px;
  box-sizing: border-box;
}
.modal_wrapper {
  min-height: 50px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  width: 100%;
  .modal_head {
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    font-size: 1.1em;
    font-weight: 700;
    border-bottom: 1px solid #ebeef5;
    background-color: #f8f8f8;
    border-radius: 4px 4px 0 0;
    .modal_title {
      height: 100%;
      color: #606266;
      font-size: 15px;
      line-height: 40px;
      font-weight: normal;
      padding-left: 10px;
    }
  }
  .modal_content {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    .drag_wrapper {
      // border: 1px dashed #cccccc;
      display: flex;
      flex-wrap: wrap;
      min-height: 100px;
      padding: 10px;
      box-sizing: border-box;
    }
  }
  .modal_footer {
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    flex-shrink: 0;
    text-align: right;
    padding: 0.4em 1em 0.8em 1em;
    box-sizing: border-box;
    box-shadow: 0px -1px 3px 0px #f0f0f0;
  }
}
.form_widget_item {
  padding: 0;
}
.sun_form_modal.container_wrapper {
  padding: 0 !important;
}
</style>