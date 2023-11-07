<template>
  <div class="sy_wrap">
    <div class="item">
      <div class="lab">组件尺寸</div>
      <div class="con">
        <el-select size="mini" v-model="designer.chosenWidget.props.size" placeholder="请选择">
          <el-option label="large" value="large"></el-option>
          <el-option label="medium" value="medium"></el-option>
          <el-option label="small" value="small"></el-option>
          <el-option label="mini" value="mini"></el-option>
        </el-select>
      </div>
    </div>
    <div class="item">
      <div class="lab">占位文字</div>
      <div class="con">
        <el-input v-model="designer.chosenWidget.props.placeholder" size="mini"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="lab">上传字段</div>
      <div class="con">
        <el-input v-model="designer.chosenWidget.props.fileField" size="mini"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="lab">文件ID字段</div>
      <div class="con">
        <el-input v-model="designer.chosenWidget.props.fileIdField" size="mini"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="lab">文件名称字段</div>
      <div class="con">
        <el-input v-model="designer.chosenWidget.props.fileNameField" size="mini"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="lab">文件URL字段</div>
      <div class="con">
        <el-input
          v-model="designer.chosenWidget.props.fileUrlField"
          placeholder="请填写返回文件地址字段"
          size="mini"
        ></el-input>
      </div>
    </div>
    <div class="item">
      <div class="lab">文件获取地址</div>
      <div class="con">
        <el-input
          v-model="designer.chosenWidget.props.fileGetUrl"
          size="mini"
          placeholder="例：/api/linyi/file/{id}"
        ></el-input>
      </div>
    </div>
    <div class="item">
      <div class="lab">文件下载地址</div>
      <div class="con">
        <el-input
          v-model="designer.chosenWidget.props.fileDownUrl"
          size="mini"
          placeholder="例：/api/linyi/file/{id}"
        ></el-input>
      </div>
    </div>
    <div class="item">
      <div class="lab">上传大小限制</div>
      <div class="con">
        <el-input
          type="number"
          v-model="designer.chosenWidget.props.fileSize"
          size="mini"
          placeholder="不填写则不限制"
        >
          <template slot="append">MB</template>
        </el-input>
      </div>
    </div>
    <div class="item">
      <div class="lab">上传限制类型</div>
      <div class="con">
        <el-select size="mini" v-model="designer.chosenWidget.props.accept" placeholder="请选择">
          <el-option label="所有文件" value></el-option>
          <el-option label="图片" value="image/*"></el-option>
          <el-option label="视频" value="video/*"></el-option>
          <el-option label="音频" value="audio/*"></el-option>
        </el-select>
      </div>
    </div>
    <div class="item">
      <div class="lab">文件下载方式</div>
      <div class="con">
        <el-select size="mini" v-model="designer.chosenWidget.props.fileDownType" placeholder="请选择">
          <el-option label="JS获取文件流下载" value="blob"></el-option>
          <el-option label="新窗口打开下载" value="window"></el-option>
        </el-select>
      </div>
    </div>
    <div class="item">
      <div class="lab">文件保存格式</div>
      <div class="con">
        <el-select size="mini" v-model="designer.chosenWidget.props.fileSaveType" placeholder="请选择">
          <el-option label="文件名,文件ID" value="name,id"></el-option>
          <el-option label="文件名,文件ID,文件地址" value="name,id,url"></el-option>
          <el-option label="文件ID" value="id"></el-option>
          <el-option label="文件地址" value="url"></el-option>
          <el-option label="原始数组" value="arr"></el-option>
        </el-select>
      </div>
    </div>
    <div class="item">
      <div class="lab">限制个数</div>
      <div class="con">
        <el-input-number size="mini" v-model="designer.chosenWidget.props.limit" :min="1"></el-input-number>
      </div>
    </div>
    <div class="item">
      <div class="lab">支持多文件</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.multiple"></el-switch>
      </div>
    </div>
    <div class="item">
      <div class="lab">是否必填</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.required"></el-switch>
      </div>
    </div>
    <div class="item">
      <div class="lab">是否只读</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.readonly"></el-switch>
      </div>
    </div>
    <div class="item">
      <div class="lab">是否隐藏</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.hide"></el-switch>
      </div>
    </div>
    <div class="item">
      <div class="lab">是否禁用</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.disabled"></el-switch>
      </div>
    </div>
    <div class="item">
      <div class="lab">隐藏文件名</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.hideFileName"></el-switch>
      </div>
    </div>
    <div class="item">
      <div class="lab">隐藏预览</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.hidePreview"></el-switch>
      </div>
    </div>
    <div class="item">
      <div class="lab">隐藏表格</div>
      <div class="con">
        <el-switch v-model="designer.chosenWidget.props.hideTable"></el-switch>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    designer: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: {},
  name: "config-file",
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style scoped lang="scss">
</style>