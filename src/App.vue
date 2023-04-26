
<template>
  <div id="app">
    <!-- <sunManage :apiSet="apiSet" /> -->
    <formDesigner
      :httpSuccessHandle="httpSuccessHandle"
      :httpErrorHandle="httpErrorHandle"
      :httpBeforeSendHandle="httpBeforeSendHandle"
      :headers="apiSet.headers"
      :baseUrl="apiSet.baseUrl"
    ></formDesigner>
  </div>
</template>

<script>
import formDesigner from "./components/formDesigner";
import sunManage from "./components/formDesigner/manage";
export default {
  name: "App",
  components: {
    formDesigner,
    sunManage
  },
  methods: {
    httpSuccessHandle(res) {},
    httpErrorHandle(res) {},
    httpBeforeSendHandle() {
      return {};
    }
  },
  data() {
    return {
      apiSet: {
        httpSuccessHandle: res => {
          if (res && res.code == "-9") {
            this.$store.commit("logout");
          }
        },
        httpErrorHandle: res => {},
        httpBeforeSendHandle: () => {
          return {};
        },
        isBase64: false,
        headers: {
          "bg-token": `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJhZG1pbiIsImRldmljZSI6ImRlZmF1bHQtZGV2aWNlIiwiZWZmIjoxNjgyNTU5NTcyNzg5LCJyblN0ciI6Im5iYnRGWTQzcUxKSW5INE1RNGRHZEVIQnVoVTJUQmtXIiwidXNlckluZm8iOiJ7XCJ1c2VyQ29kZVwiOlwiYWRtaW5cIixcInVzZXJOYW1lXCI6XCJhZG1pblwiLFwicmVhbE5hbWVcIjpcIueuoeeQhuWRmFwiLFwiY29ycFR5cGVzXCI6bnVsbCxcImxvZ2luVHlwZVwiOlwiV2ViXCIsXCJhY2NvdW50VHlwZVwiOlwiU1wiLFwib3V0VGltZVwiOjAsXCJjb3JwTnVtXCI6XCI5MTMzMDYwMjc2OTYzNjA2N0hcIixcImNvcnBOYW1lXCI6bnVsbCxcInBlcnNvbk51bVwiOm51bGwsXCJwZXJzb25OYW1lXCI6bnVsbCxcInN1cFN0YUNvZGVcIjpcIjAwMVwiLFwidXBTdGF0aW9uQ29kZXNcIjpbXCIwMDFcIl0sXCJkb3duU3RhdGlvbkNvZGVzXCI6W1wiMDAxXCIsXCIwMDNcIixcIjAwMlwiXSxcImRlcENvZGVcIjpcIjNjMmI0NGJhODRlMTQzNzhhODhkZjVlZDdiNGEwM2VkXCIsXCJjcENvZGVcIjpcIjc3Y2I5ODNhNzM3ZDQ3Y2JhMmM1MTNlM2U2MDhhZTM2XCJ9In0.IrQjuIGN4FOMg2qro57vTYcGhxH6h4YcOC3Tie-js94`
        },
        baseUrl: "/api",
        configDataKey: "configContent",
        configNameKey: "remark",
        configCodeKey: "code",
        configIdKey: "id",
        apiSetList: {
          method: "post",
          apiurl: "/web/webPage/listWebPageConfig",
          params: [],
          contentType: "JSON",
          dataFormat: "",
          baseInfo: {
            rows: "datas",
            count: "total",
            page: "pageindex",
            limit: "pagesize",
            pageDefault: "20"
          }
        },
        apiSetCreate: {
          method: "post",
          apiurl: "/web/webPage/addWebPageConfig",
          params: [],
          contentType: "JSON",
          dataFormat: ""
        },
        apiSetUpdate: {
          method: "post",
          apiurl: "/web/webPage/editWebPageConfig",
          params: [],
          contentType: "JSON",
          dataFormat: ""
        },
        apiSetDelete: {
          method: "post",
          apiurl: "/web/webPage/deleteWebPageConfig",
          params: [],
          contentType: "JSON",
          dataFormat: ""
        },
        apiSetDetail: {
          method: "post",
          apiurl: "/web/webPage/getWebPageConfig",
          params: [],
          contentType: "JSON",
          dataFormat: ""
        }
      },
      apiSet2: {
        httpSuccessHandle: res => {
          if (res && res.code == "-9") {
            this.$store.commit("logout");
          }
        },
        httpErrorHandle: res => {},
        isBase64: true,
        headers: {},
        baseUrl: "",
        configDataKey: "configcontent",
        configNameKey: "remark",
        configCodeKey: "code",
        configIdKey: "id",
        apiSetList: {
          method: "postFormData",
          apiurl: "/tz/GetWebListList",
          params: [],
          contentType: "JSON",
          dataFormat: "return res",
          baseInfo: {
            rows: "data",
            count: "total",
            page: "page",
            limit: "rows",
            pageDefault: "20"
          }
        },
        apiSetCreate: {
          method: "postFormData",
          apiurl: "/tz/AddWebListDetail",
          params: [],
          contentType: "JSON",
          dataFormat: ""
        },
        apiSetUpdate: {
          method: "postFormData",
          apiurl: "/tz/editWebListDetail",
          params: [],
          contentType: "JSON",
          dataFormat: ""
        },
        apiSetDelete: {
          method: "postFormData",
          apiurl: "/tz/DelWebListDetail",
          params: [],
          contentType: "JSON",
          dataFormat: ""
        },
        apiSetDetail: {
          method: "postFormData",
          apiurl: "/tz/GetWebListDetail",
          params: [],
          contentType: "JSON",
          dataFormat: ""
        }
      }
    };
  }
};
</script>

<style lang="scss">
body,
html {
  margin: 0;
}
#app {
  height: 100vh;
}
</style>
