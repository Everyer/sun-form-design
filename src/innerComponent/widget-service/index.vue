<template>
  <container-wrapper
    :class="'sun_form_theme_'+designer.theme"
    :widget="widget"
    :designer="designer"
    class="sun_form_service"
    :parentList="parentList"
  >
    <div class="sun_form_service_wrap" v-loading="loading">
      <sunForm @postApp="postApp"  ref="sunform" :headers="designer.headers" :parentApp="designer" :widgetList="widgetList"></sunForm>
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
  name: "widget-service",
  data() {
    return {
      widgetList: [],
      that: this,
      loading: false,
      loadingWrap: false,
      app:null,
    };
  },
  methods: {
    postApp(val){
      this.app = val;
    },
    getApp() {
      return this.app;
    },
    getDetail() {
      var w = this.widget;
      var apiSet = w.props["apiSet"];
      if (!apiSet.apiurl) {
        return;
      }
      var method = apiSet.method;
      var param = {};
      apiSet.params.forEach(item => {
        if (item.value.includes("${") && item.value.includes("}")) {
          var funStr = item.value.replace("${", "").replace("}", "");
          var fun = new Function("self", "app", "return " + funStr);
          param[item.label] = fun(this, this.designer);
        } else {
          param[item.label] = item.value;
        }
      });
      if (!apiSet.apiurl) {
        return;
      }
      this.loading = true;
      this.designer.$http[method](apiSet.apiurl, param)
        .then(res => {
          if (!apiSet.dataFormat) {
            if (res.success || res.code == "0" || res.code == 200) {
              var formData = res.data.formData;
              if (formData) {
                this.widgetList = JSON.parse(formData);
              }
            } else {
              this.designer.$message.error(res.msg);
            }
          } else {
            var fun = new Function("res", "self", "app", apiSet.dataFormat);
            var d = fun(res, this, this.designer);
            this.widgetList = d;
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    }
  },
  watch: {
    "widget.props.serviceJson": {
      handler: function(val, oldVal) {
        if (val) {
          this.widgetList = JSON.parse(val);
        } else {
          this.widgetList = [];
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {  
    this.designer.eventHandle(null, "onCreated", this.widget, this);
  },
  mounted() {
    this.designer.eventHandle(null, "onMounted", this.widget, this);
    this.getDetail();
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