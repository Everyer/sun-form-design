
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
        baseUrl: "/jcbg",
        headers: {
          "bg-token": `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJhZG1pbiIsImRldmljZSI6ImRlZmF1bHQtZGV2aWNlIiwiZWZmIjoxNjc4ODU3MjA4Nzc0LCJyblN0ciI6IlBQUXlZaVVPY0RoeWNqb2hucEJ1TFFic29qMEdJMDl1IiwidXNlckluZm8iOiJ7XCJ1c2VyY29kZVwiOlwiYWRtaW5cIixcInVzZXJuYW1lXCI6XCJhZG1pblwiLFwicmVhbG5hbWVcIjpcIueuoeeQhuWRmFwiLFwiY29ycFR5cGVzXCI6bnVsbCxcImxvZ2luVHlwZVwiOlwiV2ViXCIsXCJhY2NvdW50VHlwZVwiOlwiU1wiLFwib3V0VGltZVwiOjAsXCJjb3JwTnVtXCI6bnVsbCxcImNvcnBOYW1lXCI6bnVsbCxcInBlcnNvbk51bVwiOm51bGwsXCJwZXJzb25OYW1lXCI6bnVsbH0ifQ.B2YmJPZ2_Ltfl0aYKHUTKJ1Daj1Y_LfyTzwk-COl1p0`
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
