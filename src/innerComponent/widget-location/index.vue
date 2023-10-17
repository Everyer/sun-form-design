<template>
  <container-wrapper :widget="widget" :designer="designer" :parentList="parentList">
    <div
      class="widget_item_wrap"
      :class="{widget_item_wrap_top:widget.props.labelPosition=='top',widget_hide:widget.props.hide}"
    >
      <div
        class="lab"
        :class="{required:widget.props.required}"
        :style="{width:widget.props.labelWidth,textAlign:widget.props.labelAlign,flex:`0 0 ${widget.props.labelWidth}`}"
      >{{widget.props.label}}</div>
      <div class="con">
        <el-input
          v-if="!widget.props.isDetail"
          @change="designer.eventHandle(table||$event,'onChange',widget,that)"
          v-model="widgetValue"
          :disabled="widget.props.disabled"
          :readonly="widget.props.readonly"
          class="sy_inp"
          :size="widget.props.size"
          :style="{width:widget.props.width}"
          placeholder="请选择地理位置信息"
        >
          <el-button v-if="!widget.props.disabled&&!widget.props.readonly" @click="showMap=true" slot="append" icon="el-icon-location"></el-button>
        </el-input>
        <span class="sun_form_detail_item" v-else>
          {{widgetValue}}
        </span>
      </div>

      <vxe-modal
        v-model="showMap"
        :width="'80vw'"
        :height="'80vh'"
        show-footer
        :transfer="true"
        :destroy-on-close="true"
      >
        <template #title>
          <span>地图选择</span>
        </template>
        <template #default>
          <baidu-map
            class="bm-view"
            ak="fVZdqWFWDsoGRxz6di9W9kpMrerak5IE"
            :zoom="mapZoom"
            :center="mapCenter"
            :scroll-wheel-zoom="true"
            @ready="handlerBMap"
          />
          <el-autocomplete
            v-model="mapLocation.address"
            :fetch-suggestions="querySearch"
            placeholder="请输入详细地址搜索"
            :trigger-on-focus="false"
            :scroll-wheel-zoom="true"
            @select="handleSelect"
            class="my_inp"
          />
          <div class="bm-view-wrap">
            <baidu-map
              class="bm-view"
              :center="mapCenter"
              :zoom="mapZoom"
              :scroll-wheel-zoom="true"
              ak="baidu-ak"
              @ready="handlerBMap"
            />
          </div>
          <div class="tools_wrap" v-if="chosenPoint">
            <div class="point_wrap">
              <span class="info">经度：</span>
              {{chosenPoint.lng}}
              <span class="info">纬度：</span>
              {{chosenPoint.lat}}
            </div>
          </div>
        </template>
        <template #footer>
          <vxe-button size="mini" @click="showMap=false">取消</vxe-button>
          <vxe-button size="mini" status="primary" @click="confirm">确认</vxe-button>
        </template>
      </vxe-modal>
    </div>
  </container-wrapper>
</template>

<script>
// import BaiduMap from "vue-baidu-map/components/map/Map.vue";
// import BmView from "vue-baidu-map/components/map/MapView"; //地图视图
// import BmLocalSearch from "vue-baidu-map/components/search/LocalSearch"; //搜索
// import BmMarker from "vue-baidu-map/components/overlays/Marker"; //点标注
// import BmInfoWindow from "vue-baidu-map/components/overlays/InfoWindow"; //标注弹窗
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
export default {
  components: { BaiduMap },
  model: {
    event: "change"
  },
  props: {
    value: {
      type: [String, Number, Boolean, Array, Object],
      default: null
    },
    table: {
      type: Object,
      default: () => {
        return null;
      }
    },
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
  name: "widget-location",
  data() {
    return {
      that: this,
      showMap: false,
      widgetValue: null,
      map: null,
      mapZoom: 10,
      mapCenter: { lat: 28.664982, lng: 121.423695 },
      chosenPoint: null,
      mapLocation: {
        address: undefined,
        coordinate: undefined
      }
    };
  },
  methods: {
    handlerBMap({ BMap, map }) {
      this.BMap = BMap;
      this.map = map;
      if (this.widgetValue) {
        this.mapCenter.lng = this.widgetValue.split(",")[0];
        this.mapCenter.lat = this.widgetValue.split(",")[1];
        this.chosenPoint = this.mapCenter;
        this.mapZoom = 15;
        map.addOverlay(new this.BMap.Marker(this.mapCenter));
      } else {
        this.mapCenter.lng = 121.4423799927053;
        this.mapCenter.lat = 28.62668923584285;
      
        this.mapZoom = 10;
      }
      map.disableDoubleClickZoom();
      map.addEventListener("dblclick", e => {
        this.makerCenter(e.point);
        return false;
      });
    },
    confirm() {
      if (this.chosenPoint) {
        this.widgetValue = this.chosenPoint.lng + "," + this.chosenPoint.lat;
        this.showMap = false;
      } else {
        this.$message.warning("您还没选择位置");
      }
    },
    querySearch(queryString, cb) {
      var that = this;
      var myGeo = new this.BMap.Geocoder();
      myGeo.getPoint(
        queryString,
        function(point) {
          if (point) {
            that.mapLocation.coordinate = point;
            that.makerCenter(point);
          } else {
            that.mapLocation.coordinate = null;
          }
        },
        this.locationCity
      );
      var options = {
        onSearchComplete: function(results) {
          if (local.getStatus() === 0) {
            // 判断状态是否正确
            var s = [];
            for (var i = 0; i < results.getCurrentNumPois(); i++) {
              var x = results.getPoi(i);
              var item = { value: x.address + x.title, point: x.point };
              s.push(item);
              cb(s);
            }
          } else {
            cb();
          }
        }
      };
      var local = new this.BMap.LocalSearch(this.map, options);
      local.search(queryString);
    },
    handleSelect(item) {
      var { point } = item;
      this.mapLocation.coordinate = point;
      this.makerCenter(point);
    },
    makerCenter(point) {
      if (this.map) {
        this.map.clearOverlays();
        this.map.addOverlay(new this.BMap.Marker(point));
        this.mapCenter.lng = point.lng;
        this.mapCenter.lat = point.lat;
        this.chosenPoint = point;
        this.mapZoom = 15;
      }
    }
  },
  watch: {
    widgetValue(val) {
      this.$emit("change", val);
      this.widget.props.value = val;
    },
    value(val) {
      this.widgetValue = val;
    },
    "widget.props.value"(val) {
      if (this.widget.parentType) {
        return;
      }
      this.widgetValue = val;
    }
  },
  created() {
    if (this.widget.parentType) {
      this.widgetValue = this.value;
    } else {
      this.widgetValue = this.widget.props.value;
    }
    this.designer.eventHandle(null, "onCreated", this.widget, this);
  },
  mounted() {
    this.designer.eventHandle(null, "onMounted", this.widget, this);
  }
};
</script>

<style scoped lang="scss">
.bm-view {
  width: 100%;
  height: 100%;
}
.my_inp {
  position: absolute;
  width: 500px !important;
  z-index: 111 !important;
  left: 20px;
  top: 20px;
}
.bm-view-wrap {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.bm-view {
  width: 100%;
  height: 100%;
}
.tools_wrap {
  background: #fafafa;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  border-top: 1px solid #cccccc;
  box-shadow: 0 -3px 3px rgba($color: #000000, $alpha: 0.1);
  z-index: 1;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 10px 30px 10px;
  box-sizing: border-box;
}
.point_wrap {
  padding-right: 20px;
  .info {
    color: #409eff;
    font-weight: bold;
    margin-left: 20px;
  }
}
</style>
<style  lang="scss">
.anchorBL {
  display: none;
}
</style>