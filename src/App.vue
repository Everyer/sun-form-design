
<template>
  <div id="app">
    <sunManage :apiSet="apiSet" />
    <!-- <formDesigner
      :httpSuccessHandle="httpSuccessHandle"
      :httpErrorHandle="httpErrorHandle"
      :headers="apiSet.headers"
      :baseUrl="apiSet.baseUrl"
    ></formDesigner> -->
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
    httpSuccessHandle(res) {
      console.log(res);
    },
    httpErrorHandle(res) {
      console.log(res);
    }
  },
  data() {
    return {
      apiSet: {
        httpSuccessHandle(res) {
          console.log(res);
        },
        httpErrorHandle(res) {
          console.log(res);
        },
        baseUrl: "/api",
        headers: {
          "bg-token": `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJhZG1pbiIsImRldmljZSI6ImRlZmF1bHQtZGV2aWNlIiwiZWZmIjoxNjgwNjU1MTkyMTg1LCJyblN0ciI6IlFONkdNdndtUUtjblBaQ3lYRVFaQXZPeTlOd05mNXFRIiwidXNlckluZm8iOiJ7XCJ1c2VyY29kZVwiOlwiYWRtaW5cIixcInVzZXJuYW1lXCI6XCJhZG1pblwiLFwicmVhbG5hbWVcIjpcIueuoeeQhuWRmFwiLFwiY29ycFR5cGVzXCI6bnVsbCxcImxvZ2luVHlwZVwiOlwiV2ViXCIsXCJhY2NvdW50VHlwZVwiOlwiU1wiLFwib3V0VGltZVwiOjAsXCJjb3JwTnVtXCI6bnVsbCxcImNvcnBOYW1lXCI6bnVsbCxcInBlcnNvbk51bVwiOm51bGwsXCJwZXJzb25OYW1lXCI6bnVsbCxcInN1cFN0YUNvZGVcIjpcIjAwMVwiLFwidXBTdGF0aW9uQ29kZXNcIjpbXCIwMDFcIl0sXCJkb3duU3RhdGlvbkNvZGVzXCI6W1wiMDAxXCIsXCIwMDNcIixcIjAwMlwiXX0ifQ._ePilAeXqTbVriFUiyWPzRuJKuH84mCan_BD24Fr07A`
        },
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
