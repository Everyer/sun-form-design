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
        <div class="ckeditor_wrap" v-if="!widget.props.isDetail">
          <Editor v-model="widgetValue" :id="id" :init="init" :disabled="widget.props.readonly"></Editor>
        </div>
        <div class="sun_form_detail_item" v-else v-html="widgetValue"></div>
      </div>
    </div>
  </container-wrapper>
</template>

<script>
import tinymce from "tinymce/tinymce"; //tinymce默认hidden，不引入不显示
import Editor from "@tinymce/tinymce-vue"; //编辑器引入
import "tinymce/themes/silver/theme"; //编辑器主题
import "tinymce/plugins/image"; // 插入上传图片插件
import "tinymce/plugins/media"; // 插入视频插件
import "tinymce/plugins/table"; // 插入表格插件c
import "tinymce/plugins/lists"; // 列表插件
import "tinymce/plugins/wordcount"; // 字数统计插件
import "tinymce/plugins/charmap"; // 特殊字符
import "tinymce/plugins/preview"; // 预览
import "tinymce/plugins/hr"; // 水平线
import "tinymce/plugins/imagetools"; // 图片编辑工具
import "tinymce/plugins/code"; // 编辑源码
import "tinymce/plugins/fullscreen"; // 全屏
import "tinymce/plugins/link"; // 超链接
import "tinymce/plugins/paste"; // 粘贴
import "tinymce/plugins/quickbars"; // 快速工具栏
import "tinymce/plugins/searchreplace"; // 查找替换
import "tinymce/plugins/searchreplace"; // 查找替换
import "tinymce/plugins/print"; // 查找替换
import "tinymce/plugins/importcss";
import "tinymce/plugins/autolink";
import "tinymce/plugins/anchor";
import "tinymce/plugins/advlist";
import "tinymce/plugins/directionality";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/codesample";
import "tinymce/plugins/template";
import "tinymce/plugins/toc";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/textpattern";
import "tinymce/plugins/noneditable";
import "tinymce/plugins/insertdatetime";
import '../../assets/js/langs/zh-Hans.js'
export default {
  components: { Editor },
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
  name: "widget-editor",
  data() {
    return {
      that: this,
      widgetValue: null,
      id: this.widget.id + (this.designer.formMode ? "_f" : ""),
      mytinymce: tinymce,
      init: {
        language: "zh-Hans",
        images_upload_url: "/demo/upimg.php", //这两行是更改只能上传图片路径的方法，变成可以拖拉上传（此处路径为后端需要上传图片的路径）
        images_upload_base_path: "/demo", //这两行是更改只能上传图片路径的方法，变成可以拖拉上传
        selector: "#" + this.id,
        // skin_url: "./tinymce/skins/ui/" + this.widget.props.theme, //自己的static中路径
        // skin_url:"../../assets/tinymce/skins/ui/oxide/skin.min.css",
        // content_css: ['../../assets/tinymce/skins/ui/oxide/content.min.css'], //自己的static中路径
        content_style: "img {max-width:100%;}", //限制图片大小
        plugins:
          "print preview importcss  searchreplace autolink  directionality  visualblocks visualchars fullscreen image link media  template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists  wordcount   imagetools textpattern noneditable    charmap   quickbars   code  ", //插件
        menubar: true, //此处设置为false为默认不显示菜单栏，如果需要展示出来可以将此行注释
        //工具栏
        toolbar: [
          "code | undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist  | forecolor backcolor casechange   removeformat | pagebreak | charmap  | fullscreen  preview  print | insertfile image media  template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment "
        ],
        height: 400, //高度
        // min_height:400,
        branding: false, //隐藏右下角技术支持
        paste_preprocess: function(plugin, args) {
          console.log(args.content);
        },
        paste_as_text: true,
        init_instance_callback: editor => {
          editor.on("input", e => {
            this.designer.eventHandle(e.target.innerHTML, "onChange", this.widget, this);
          });
          editor.on("change", e => {
          });
        }
      }
    };
  },
  methods: {},
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
    tinymce.init({}); //初始化
    this.designer.eventHandle(null, "onMounted", this.widget, this);
  }
};
</script>

<style scoped lang="scss">
@import '../../assets/tinymce/skins/ui/oxide/skin.min.css';
@import '../../assets/tinymce/skins/ui/oxide/content.min.css';
@import '../../assets/tinymce/skins/content/default/content.min.css';
.ckeditor_wrap {
  width: 100%;
  /* table 样式 */
}
</style>
