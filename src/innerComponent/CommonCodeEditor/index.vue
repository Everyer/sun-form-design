<template>
  <div class="sy_wrap">
    <editor
      v-model="jsData"
      @init="editorInit()"
      :lang="lang"
      theme="monokai"
      width="100%"
      :height="height"
      ref="edit1"
      :options="options"
    ></editor>
  </div>
</template>

<script>

export default {
  components: {
    editor: require("vue2-ace-editor")
  },
  name: "CommonCodeEditor",
  props: {
    value: {
      type: String,
      default: ""
    },
    readonly: {
      type: Boolean,
      default: false
    },
    lang: {
      type: String,
      default: "javascript"
    },
    height: {
      type: String,
      default: "100%"
    }
  },
  model: {
    event: "change"
  },
  data() {
    return {
      timer:null,
      options: {
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true /*自动补全*/
      },
      jsData: null
    };
  },
  watch: {
    lang: {
      handler: function(val) {
        this.$refs.edit1.editor.getSession().setMode("ace/mode/" + val);
      },
      deep: true
    },
    readonly: {
      handler: function(val) {
        this.$refs.edit1.editor.setReadOnly(val);
      },
      deep: true
    },
    jsData: {
      handler: function(val) {
        clearInterval(this.timer);
        this.timer=setTimeout(() => {
          this.$emit("change", val);
        }, 400);
      },
      deep: true
    },
    value: {
      handler: function(val) {
        this.jsData = val;
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    insertCode(code) {
      this.$refs.edit1.editor.insert(code);
    },
    editorInit() {
      require("brace/mode/" + this.lang); //language
      require("brace/ext/searchbox"); //language
      require("brace/ext/beautify");
      require("brace/theme/monokai");
      this.$refs.edit1.editor.setShowFoldWidgets(true);
      if (this.readonly) {
        this.$refs.edit1.editor.setReadOnly(true);
      }
    }
  },
  created() {
    this.jsData = this.value;
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.sy_wrap {
  width: 100%;
  height: 100%;
}
</style>