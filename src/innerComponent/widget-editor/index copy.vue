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
          <div style="border: 1px solid #ccc;">
            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editor"
              :defaultConfig="toolbarConfig"
              :mode="mode"
            />
            <Editor
              v-model="widgetValue"
              :defaultConfig="editorConfig"
              :mode="mode"
              @onCreated="onCreated"
            />
          </div>
        </div>
        <div class="sun_form_detail_item" v-else v-html="widgetValue"></div>
        {{widgetValue}}
        <!-- <el-input
          v-if="!widget.props.isDetail"
          @change="designer.eventHandle(table||$event,'onChange',widget,that)"
          @input="designer.eventHandle(table||$event,'onInput',widget,that)"
          @focus="designer.eventHandle(table||$event,'onFocus',widget, that)"
          @blur="designer.eventHandle(table||$event,'onBlur',widget, that)"
          v-model="widgetValue"
          :disabled="widget.props.disabled"
          :readonly="widget.props.readonly"
          class="sy_inp"
          :size="widget.props.size"
          :style="{width:widget.props.width}"
          :placeholder="widget.props.placeholder"
        >
          <el-button
            @click="designer.eventHandle(table||widgetValue,'onHandle',widget, that)"
            v-if="widget.props.onHandle "
            slot="append"
            icon="el-icon-copy-document"
          ></el-button>
        </el-input>-->
        <!-- <span class="sun_form_detail_item" v-else>
          {{widgetValue}}
        </span>-->
      </div>
    </div>
  </container-wrapper>
</template>

<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
export default {
  components: { Editor, Toolbar },
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
      widgetValue: "",
      toolbarConfig: {},
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default",
      editor: null
    };
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
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
.ckeditor_wrap {
  width: 100%;
  /* table 样式 */
}
</style>
