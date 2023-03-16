<template>
  <div class="form_wrap">
    <vxe-modal
      v-model="uploadConfig.show"
      @hide="hideModel"
      @show="showModel"
      :fullscreen="false"
      :id="uploadConfig.id"
      width="800"
      height="600"
      min-width="600"
      min-height="400"
      show-zoom
      resize
      storage
      show-footer
      :transfer="true"
      :zIndex="1020"
      :destroy-on-close="true"
    >
      <template #title>
        <span>{{uploadConfig.title}}</span>
      </template>
      <template #default>
        <div class="upload">
          <el-upload
            v-if="uploadConfig.type=='edit'"
            class="upload-demo"
            drag
            :action="uploadConfig.fileNoToken?`${baseUrl}/oss/uploadOssFileNoNameNoToken`:`${baseUrl}/oss/uploadOssFileNoName`"
            :headers="{'bg-token':$store.state.user.token}"
            multiple
            :on-success="((res, file)=>{handleFileSuccess(res, file)})"
            :before-upload="(beforeUpload)"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">拖拽或点击上传</div>
          </el-upload>
          <vxe-table
            class="my_table"
            ref="my_table"
            :loading="loading"
            :data="fileList"
            :show-file-list="false"
            border
            show-header-overflow
            highlight-hover-row
            auto-resize
            stripe
            round
            resizable
            header-row-class-name="my_head"
          >
            <vxe-table-column align="center" type="seq" title="序号" width="60" field="index"></vxe-table-column>
            <vxe-table-column align="center" title="文件名" field="name"></vxe-table-column>
            <vxe-table-column align="center" title="预览" width="145">
              <template #default="{ row ,rowIndex }">
                <div class="file_view_wrap">
                  <el-image
                    class="my_pic"
                    v-if="fileType(row.name)=='image'"
                    :src="transScaleMedia(row.fileid,'image')"
                    :preview-src-list="[`${origin}/DataInput/FileService?method=DownloadFile&fileid=${row.fileid}`]"
                  ></el-image>
                  <!-- /DataInput/FileService?type=small&method=DownloadFile&fileid= -->
                  <el-image
                    class="my_pic"
                    v-else-if="fileType(row.name)=='media'"
                    :src="transScaleMedia(row.fileid,'media')"
                  ></el-image>
                  <div class="other_file" v-else>
                    <svg-icon class="svg" :name="`ali_file`" />
                    <div class="other_file_name">{{row.name}}</div>
                  </div>
                  <div
                    @click="showVideo(row)"
                    class="file_video_play"
                    v-if="fileType(row.name)=='media'"
                  >
                    <i class="el-icon-video-play"></i>
                  </div>
                </div>
              </template>
            </vxe-table-column>
            <vxe-table-column
              align="center"
              title="状态"
              field="status"
              v-if="uploadConfig.type=='edit'"
              width="100"
            >
              <template #default="{ row ,rowIndex }">
                <div v-if="row.status=='上传成功'" style="color:green">{{row.status}}</div>
                <div v-else style="color:red">{{row.status}}</div>
              </template>
            </vxe-table-column>
            <vxe-table-column align="center" title="操作" width="145">
              <template #default="{ row ,rowIndex }">
                <div>
                  <el-button
                    v-if="uploadConfig.type=='edit'"
                    size="mini"
                    type="primary"
                    @click="delItem(row,rowIndex)"
                  >删除</el-button>
                  <el-button
                    :disabled="row.status!=='上传成功'"
                    size="mini"
                    type="primary"
                    @click="openFile(row)"
                  >下载</el-button>
                </div>
              </template>
            </vxe-table-column>
          </vxe-table>
        </div>
      </template>
      <template #footer>
        <el-button
          status="primary"
          size="mini"
          @click="uploadConfig.save(d)"
          v-if="uploadConfig.type=='edit'"
        >确认</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="removeFail"
          v-if="uploadConfig.type=='edit'"
        >清除不成功</el-button>
        <el-button size="mini" @click="uploadConfig.show=false">取消</el-button>
      </template>
    </vxe-modal>
    <common-video-player ref="video" :url="videoUrl" v-if="videoUrl"></common-video-player>
  </div>
</template>

<script>
import { fileType } from "@/util";
let Base64 = require("js-base64").Base64;
export default {
  props: {
    uploadConfig: {}
  },
  computed: {
    d() {
      var arr = this.fileList.filter(e => e.status == "上传成功");
      return arr.map(e => e.name + "," + e.fileid).join("|");
    }
  },
  name: "CommonUpload",
  methods: {
    showVideo(row) {
      this.videoUrl =
        process.env.VUE_APP_BASEURL + "/oss/viewOssFile/" + row.fileid;
      this.$nextTick(() => {
        this.$refs.video.openVideo();
      });
    },
    transScaleMedia(fileid, type) {
      if (type == "image") {
        return (
          this.origin +
          "/DataInput/FileService?type=small&method=DownloadFile&fileid=" +
          fileid
        );
      }
      if (type == "media") {
        return (
          this.origin +
          "/DataInput/FileService?type=small&method=DownloadFile&fileid=" +
          fileid
        );
      }
    },
    fileType,
    openFile(row) {
      window.open(
        process.env.VUE_APP_BASEURL + "/oss/viewOssFile/" + row.fileid
      );
    },
    delItem(row, rowIndex) {
      if (row.status != "上传成功") {
        this.fileList.splice(rowIndex, 1);
      } else {
        this.$confirm("将删除此条目，是否删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.fileList.splice(rowIndex, 1);
          })
          .catch(() => {});
      }
    },
    removeFail() {
      this.fileList = this.fileList.filter(e => e.status == "上传成功");
    },
    handleFileChange(file, fileList) {},
    beforeUpload(file) {
      this.loading = true;
    },
    handleFileSuccess(res, file) {
      setTimeout(() => {
        this.loading = false;
      }, 500);
      if (res.success) {
        this.fileList.push({
          name: file.name,
          status: "上传成功",
          fileid: res.data.fileid
        });
      } else {
        this.fileList.push({
          name: file.name,
          status: res.msg,
          fileid: ""
        });
      }
    },
    handleFileRemove(file, fileList) {},
    hideModel() {
      this.fileList = [];
    },
    showModel() {
      if (this.uploadConfig.files) {
        this.fileList = this.uploadConfig.files
          .split("|")
          .filter(e => e !== "")
          .map(e => {
            return {
              name: e.split(",")[1],
              status: "上传成功",
              fileid: e.split(",")[0]
            };
          });
      }
    }
  },
  data() {
    return {
      videoUrl: "",
      origin: location.origin,
      fileList: [],
      loading: false,
      baseUrl: process.env.VUE_APP_BASEURL
    };
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.el-upload {
  width: 100%;
  .el-upload-dragger {
    width: 100%;
  }
}
.my_pic {
  border-radius: 5px;
  padding: 3px;
  box-sizing: border-box;
  border: 2px dashed #cccccc;
}
.el-upload-list {
  display: none;
}
.other_file {
  font-size: 80px;
  .other_file_name {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.file_view_wrap {
  position: relative;
  .file_video_play {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: -5px;
    z-index: 111;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .el-icon-video-play {
      color: #ffffff;
      font-size: 50px;
      opacity: 1;
    }
  }
  .file_video_play:hover {
    .el-icon-video-play {
      opacity: 0.6;
      font-size: 50px;
    }
  }
}
::v-deep {
  
}
</style>
