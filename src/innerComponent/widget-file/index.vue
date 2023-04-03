<template>
  <container-wrapper :widget="widget" :designer="designer" :parentList="parentList">
    <div
      class="widget_item_wrap sun_form_upload"
      :class="{widget_item_wrap_top:widget.props.labelPosition=='top',widget_hide:widget.props.hide}"
    >
      <div
        class="lab"
        :class="{required:widget.props.required}"
        :style="{width:widget.props.labelWidth,textAlign:widget.props.labelAlign,flex:`0 0 ${widget.props.labelWidth}`}"
      >{{widget.props.label}}</div>
      <div class="con">
        <el-button
          :loading="loading"
          size="mini"
          icon="el-icon-upload2"
          type="primary"
          round
          @click="$refs.sy_file.click()"
          plain
        >选择文件</el-button>
        <input
          v-show="false"
          type="file"
          :accept="widget.props.accept"
          :multiple="widget.props.multiple"
          @change="changeHandle"
          ref="sy_file"
        />
        <vxe-table
          v-if="dataList.length"
          class="my_table"
          ref="my_table"
          :data="dataList"
          :show-file-list="false"
          border
          show-overflow
          show-header-overflow
          highlight-hover-row
          auto-resize
          round
          resizable
          header-row-class-name="my_head"
        >
          <vxe-table-column align="center" type="seq" title="序号" width="60" field="index"></vxe-table-column>
          <vxe-table-column align="center" title="文件名" :field="widget.props.fileNameField"></vxe-table-column>
          <vxe-table-column align="center" title="操作" width="210">
            <template #default="{ row ,rowIndex }">
              <div>
                <el-button
                  size="mini"
                  type="danger"
                  round
                  plain
                  icon="el-icon-delete"
                  @click="delItem(row,rowIndex)"
                >删除</el-button>
                <el-button
                  size="mini"
                  round
                  plain
                  type="primary"
                  icon="el-icon-download"
                  @click="openFile(row)"
                >下载</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
    </div>
  </container-wrapper>
</template>

<script>
export default {
  components: {},
  model: {
    event: "change"
  },
  props: {
    value: {
      type: [String, Number, Boolean, Array, Object],
      default: null
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
  name: "widget-file",
  methods: {
    changeHandle(e) {
      var el = this.$refs.sy_file;
      var files = el.files;
      if (files.length + this.dataList.length > this.widget.props.limit) {
        this.$message.error(
          "上传文件数量不能超过" + this.widget.props.limit + "个"
        );
      } else {
        for (let i = 0; i < files.length; i++) {
          var file = files[i];
          var formData = new FormData();
          formData.append(this.widget.props.fileField, file);
          this.loading = true;
          this.uploadRequest(formData, 300 * i);
        }
      }
    },
    uploadRequest(formData, ms) {
      setTimeout(() => {
        console.log(new Date().getTime());
        this.designer.$http
          .postFile(this.widget.props.apiSet.apiurl, formData)
          .then(res => {
            if (res.code == 200 || res.success || res.code == 0) {
              this.$message.success(
                res.data[this.widget.props.fileNameField] + "上传成功"
              );
              this.dataList.push(res.data);
            } else {
              this.$message.error("上传失败");
            }
            setTimeout(() => {
              this.loading = false;
            }, 500);
          })
          .catch(err => {
            this.$message.error("上传失败");
          });
      }, ms);
    },
    openFile(row) {
      var fileGetUrl = this.widget.props.fileGetUrl;
      if (fileGetUrl) {
        if (fileGetUrl.includes("{id}")||fileGetUrl=='{url}') {
          var id = row[this.widget.props.fileIdField];
          var url = fileGetUrl.replace("{id}", id);
          if (this.widget.props.fileDownType == "blob") {
            var obj = {};
            obj[this.widget.props.fileIdField] = id;
            this.designer.$http.getBlob(url, obj).then(res => {
              var blob = new Blob([res], { type: "application/octet-stream" });
              var fileName = row[this.widget.props.fileNameField];
              if ("download" in document.createElement("a")) {
                // 非IE下载
                var elink = document.createElement("a");
                elink.download = fileName;
                elink.style.display = "none";
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href); // 释放URL 对象
                document.body.removeChild(elink);
              } else {
                // IE10+下载
                navigator.msSaveBlob(blob, fileName);
              }
            });
          } else {
            url =
              fileGetUrl.replace("{id}", id) +
              "?" +
              this.widget.props.fileIdField +
              "=" +
              id;

            if(fileGetUrl=='{url}'){
              url = row[this.widget.props.fileUrlField]
            }
            window.open(url);
          }
        }
      }
    },
    delItem(row, rowIndex) {
      this.dataList.splice(rowIndex, 1);
    },
    reinputData(val) {
      var fileSaveType = this.widget.props.fileSaveType;
      var dataList = [];
      var arr = [];
      switch (fileSaveType) {
        case "name,id":
          if (val && val.length) {
            arr = val.split("|");
            arr.forEach(item => {
              var obj = {};
              obj[this.widget.props.fileNameField] = item.split(",")[0];
              obj[this.widget.props.fileIdField] = item.split(",")[1];
              dataList.push(obj);
            });
          }
          break;
        case "name,id,url":
          if (val && val.length) {
            arr = val.split("|");
            arr.forEach(item => {
              var obj = {};
              obj[this.widget.props.fileNameField] = item.split(",")[0];
              obj[this.widget.props.fileIdField] = item.split(",")[1];
              obj[this.widget.props.fileUrlField] = item.split(",")[2] || "";
              dataList.push(obj);
            });
          }
          break;
        case "id":
          if (val && val.length) {
            arr = val.split("|");
            arr.forEach(item => {
              var obj = {};
              obj[this.widget.props.fileNameField] = item;
              obj[this.widget.props.fileIdField] = item;
              dataList.push(obj);
            });
          }
          break;

        case "url":
          if (val && val.length) {
            arr = val.split(",");
            arr.forEach(item => {
              var obj = {};
              obj[this.widget.props.fileNameField] = item;
              dataList.push(obj);
            });
          }
          break;
        case "arr":
          if (val && val.length) {
            dataList = val;
          }
          break;

        default:
          break;
      }
      this.dataList = dataList;
    }
  },
  data() {
    return {
      dataList: [],
      that: this,
      widgetValue: null,
      loading: false
    };
  },
  watch: {
    dataList(val) {
      var fileSaveType = this.widget.props.fileSaveType;
      var str = "";
      val.forEach(e => {
        var name = e[this.widget.props.fileNameField];
        var id = e[this.widget.props.fileIdField];
        var url = e[this.widget.props.fileUrlField] || "";
        switch (fileSaveType) {
          case "name,id":
            var s = name + "," + id;
            if (str) {
              str += "|" + s;
            } else {
              str = s;
            }
            break;
          case "name,id,url":
            var s = name + "," + id + (url ? "," + url : "");
            if (str) {
              str += "|" + s;
            } else {
              str = s;
            }
            break;
          case "id":
            var s = id;
            if (str) {
              str += "|" + s;
            } else {
              str = s;
            }
            break;
          case "url":
            var s = url;
            if (str) {
              str += "," + s;
            } else {
              str = s;
            }
            break;
          default:
            str = val;
            break;
        }
      });
      this.$emit("change", str);
      this.widget.props.value = str;
    },
    value(val) {
      this.reinputData(val);
    },
    "widget.props.value"(val) {
      if (this.widget.parentType) {
        return;
      }
      this.reinputData(val);
    }
  },
  created() {
    if (this.value || this.widget.props.value) {
      this.reinputData(this.value || this.widget.props.value);
      this.fileList = this.$utils.clone(this.dataList, true);
    }
    this.designer.eventHandle(null, "onCreated", this.widget, this);
  },
  mounted() {
    this.designer.eventHandle(null, "onMounted", this.widget, this);
  }
};
</script>

<style scoped lang="scss">
.upload_wrap {
  width: 100px;
  height: 100px;
  text-align: center;
  background: #fafafa;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  -webkit-transition: border-color 0.3s;
  transition: border-color 0.3s;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  .icon {
    font-size: 50px;
    color: #d9d9d9;
  }
  .text {
    color: #d9d9d9;
    font-size: 14px;
  }
}
.my_table {
  margin-top: 10px;
}
:deep {
  .my_head {
    background: #fafafa;
  }
}
</style>