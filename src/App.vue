
<template>
  <div id="app">
    <!-- <sunManage :apiSet="apiSet3" /> -->
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
          "bg-token": `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJmZWM3NGQ0NGUwNmI0ZGEwYTIyMmI4NGQzNDJhNzZlYyIsImRldmljZSI6ImRlZmF1bHQtZGV2aWNlIiwiZWZmIjoxNjg2NjM0NjU3Nzg0LCJyblN0ciI6Ijk3UEduVENwT2puMDdEeWpYTFl6MkczVUFVTHh2VXU5IiwidXNlckluZm8iOiJ7XCJ1c2VyQ29kZVwiOlwiZmVjNzRkNDRlMDZiNGRhMGEyMjJiODRkMzQyYTc2ZWNcIixcInVzZXJOYW1lXCI6XCJ0ZXN0cXlcIixcInJlYWxOYW1lXCI6XCLmtYvor5XkvIHkuJpcIixcImNvcnBUeXBlc1wiOm51bGwsXCJsb2dpblR5cGVcIjpcIldlYlwiLFwiYWNjb3VudFR5cGVcIjpcIlFcIixcIm91dFRpbWVcIjowLFwiY29ycE51bVwiOlwiOTEzNzEzMDBNQTNNSFROTjlCXCIsXCJjb3JwTmFtZVwiOm51bGwsXCJwZXJzb25OdW1cIjpudWxsLFwicGVyc29uTmFtZVwiOm51bGwsXCJzdXBTdGFDb2RlXCI6bnVsbCxcInVwU3RhdGlvbkNvZGVzXCI6bnVsbCxcImRvd25TdGF0aW9uQ29kZXNcIjpudWxsLFwiZGVwQ29kZVwiOlwiMzUyOWFjMTU4ODk0NDRlMjg1NGQ0ZjA0OTM0YTg0MzBcIixcImNwQ29kZVwiOlwiZDcyZDM4ZWFjNzczNDUyNTgyOTA0NDM0YjNiZGJiNzRcIixcInByak51bVwiOm51bGx9In0.2v7ILUvNVTw9FYYg65XbftMjamEDYqXVeYFBTTnWjE4`
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
      },
      apiSet3: {
        httpSuccessHandle: res => {
          if (res && res.code == "-9") {
            this.$store.commit("logout");
          }
        },
        httpErrorHandle: res => {},
        headers: {
          Authorization: "Bearer Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjZjMTA3OTc4LTlhNDctNDVkMC04ZTE3LTNhZjg3OTJmNDQ3MiJ9.I-iiTehfGQ8B0SYNNcUF9GEV503dQe9HZUk7fUvnc_efivQL_gDmgoebIBMTKru5gJIACjE1zRX4cWb9_A17IQ"
        },
        baseUrl: "http://localhost:9999",
        configDataKey: "configContent",
        configNameKey: "remark",
        configCodeKey: "code",
        configIdKey: "id",
        apiSetList: {
          dataFormat: "return res",
          method: "get",
          apiurl: "/system/configForm/list",
          params: [],
          contentType: "JSON",
          baseInfo: {
            rows: "rows",
            count: "total",
            page: "pageindex",
            limit: "pagesize",
            pageDefault: "10"
          }
        },
        apiSetCreate: {
          method: "post",
          apiurl: "/system/configForm",
          params: [],
          contentType: "JSON",
          dataFormat: ""
        },
        apiSetUpdate: {
          method: "put",
          apiurl: "/system/configForm",
          params: [],
          contentType: "JSON",
          dataFormat: ""
        },
        apiSetDelete: {
          method: "delete",
          apiurl: "/system/configForm/{id}",
          params: [],
          contentType: "JSON",
          dataFormat: ""
        },
        apiSetDetail: {
          method: "get",
          apiurl: "/system/configForm/{id}",
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
