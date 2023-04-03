
<template>
  <div id="app">
    <!-- <sunManage :apiSet="apiSet" /> -->
    <formDesigner :headers="apiSet.headers" :baseUrl="apiSet.baseUrl"></formDesigner>
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
  data() {
    return {
      apiSet: {
        baseUrl: "/api",
        headers: {
          "bg-token":`eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJhZG1pbiIsImRldmljZSI6ImRlZmF1bHQtZGV2aWNlIiwiZWZmIjoxNjgwMjQ3NjE3MDAyLCJyblN0ciI6IlRJTlZLN2hia09TNjg3ZGxpNlhUb1JoblB2dWhJTWl5IiwidXNlckluZm8iOiJ7XCJ1c2VyY29kZVwiOlwiYWRtaW5cIixcInVzZXJuYW1lXCI6XCJhZG1pblwiLFwicmVhbG5hbWVcIjpcIueuoeeQhuWRmFwiLFwiY29ycFR5cGVzXCI6bnVsbCxcImxvZ2luVHlwZVwiOlwiV2ViXCIsXCJhY2NvdW50VHlwZVwiOlwiU1wiLFwib3V0VGltZVwiOjAsXCJjb3JwTnVtXCI6bnVsbCxcImNvcnBOYW1lXCI6bnVsbCxcInBlcnNvbk51bVwiOm51bGwsXCJwZXJzb25OYW1lXCI6bnVsbCxcInN1cFN0YUNvZGVcIjpcIjAwMVwiLFwidXBTdGF0aW9uQ29kZXNcIjpbXCIwMDFcIl0sXCJkb3duU3RhdGlvbkNvZGVzXCI6W1wiMDAxXCIsXCIwMDNcIixcIjAwMlwiXX0ifQ.VU2K15GTItXTPkyvO_v4IyImq6lCY7k91Xz76moPQMw`
        },
        configDataKey: "configContent",
        configNameKey: "remark",
        configCodeKey: "code",
        configIdKey: "id",
        apiSetList: {
          method: "post",
          apiurl: "/webPage/listWebPageConfig",
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
          apiurl: "/webPage/addWebPageConfig",
          params: [],
          contentType: "JSON",
          dataFormat: ""
        },
        apiSetUpdate: {
          method: "post",
          apiurl: "/webPage/editWebPageConfig",
          params: [],
          contentType: "JSON",
          dataFormat: ""
        },
        apiSetDelete: {
          method: "post",
          apiurl: "/webPage/deleteWebPageConfig",
          params: [],
          contentType: "JSON",
          dataFormat: ""
        },
        apiSetDetail: {
          method: "post",
          apiurl: "/webPage/getWebPageConfig",
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
