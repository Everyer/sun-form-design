<template>
  <div class="form_widget_container form_mode" :class="'sun_form_theme_'+designer.theme">
    <div class="drag_wrapper">
      <template v-for="(item, index) in designer.widgetList">
        <div class="form_widget_item" :style="formatStyle(item)">
          <component
            :parent-list="designer.widgetList"
            :is="'widget-'+item.type"
            :widget="item"
            v-if="!item.props.hide"
            :key="item.id"
            :designer="designer"
          ></component>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
import { createDesigner } from "@/mixins/designer";
import "../importComp";
export default {
  components: { Draggable },
  name: "sunForm",
  props: {
    baseUrl: {
      type: String,
      default: () => {
        return "";
      }
    },
    parentApp: {
      type: Object,
      default: () => {
        return {};
      }
    },
    widgetList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    headers: {
      type: Object,
      default: () => {
        return {};
      }
    },
    theme: {
      type: String,
      default: () => {
        return "primary";
      }
    },
    params: {
      type: Object,
      default: () => {
        return {};
      }
    },
    httpSuccessHandle: {
      type: Function,
      default: () => {
        return null;
      }
    },
    httpErrorHandle: {
      type: Function,
      default: () => {
        return null;
      }
    },
    httpBeforeSendHandle: {
      type: Function,
      default: () => {
        return null;
      }
    }
  },
  data() {
    return {
      count: 0,
      designer: createDesigner(
        this,
        this.widgetList,
        this.headers,
        this.theme,
        this.parentApp,
        this.baseUrl,
        this.httpSuccessHandle,
        this.httpErrorHandle,
        this.httpBeforeSendHandle,
        this.params
      )
    };
  },
  methods: {
    formatStyle(item){
      if(item.type!=='div'){
        return {
          width:4.16667*item.props.width+'%'
        };
      }else{
        var style = {};
        var arr=item.props.style;
        if(item.props.divWidth){
          style.width=item.props.divWidth;
        }
        if(item.props.divHeight){
          style.height=item.props.divHeight;
        }
        if(arr&&arr.length>0){
          arr.forEach(item=>{
            style[item.label]=item.value;
          })
        }
        return style;
      }
    },
    init() {
      var findForm = widgetList => {
        for (var i = 0; i < widgetList.length; i++) {
          var item = widgetList[i];
          if (item.isForm) {
            this.$set(item.props, "defaultValue", item.props.value);
          }
          if (item.type == "datatable") {
            var q = item.props.tableConfig.queryList;
            for (var j = 0; j < q.length; j++) {
              var item2 = q[j];
              this.$set(item2.props, "defaultValue", item2.props.value);
            }
          }
          if (item.widgetList && item.widgetList.length) {
            findForm(item.widgetList);
          }
        }
      };
      findForm(this.widgetList);
    }
  },
  watch: {
    widgetList: {
      handler(val) {
        this.designer.widgetList = val;
        this.init();
      },
      deep: true
    },
    headers: {
      handler(val) {
        this.designer.headers = val;
      },
      deep: true
    },
    theme: {
      handler(val) {
        this.designer.theme = val;
      }
    }
  },
  created() {
    this.$emit("postApp", this.designer);
  },
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
:deep {
  .form_widget_item {
    padding: 0;
  }
  .widget_item {
    margin: 3px;
  }
}
</style>
<style lang="scss">
@import "../../assets/theme/primary.scss";
</style>