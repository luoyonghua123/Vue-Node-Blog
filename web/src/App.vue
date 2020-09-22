<template>
  <div id="app">
    <!-- <v-header></v-header>
    <router-view/>
    <v-footer></v-footer> -->
    <router-view></router-view>
  </div>
</template>
<script>
// import VHeader from "./components/main-header";
// import VFooter from "./components/main-footer";

export default {
  // components: {
  //   VHeader,
  //   VFooter
  // }
};
</script>
<style lang='less'>
/*使用公共的css代码块*/
@import "./assets/css/common.less";
html,
body {
  margin: 0;
  padding: 0;
  background: #f0f0f0 !important;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

ul,
li,
h1,
div,
dl,
dt,
dd {
  margin: 0;
  padding: 0;
  list-style: none;
}

#app {
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
</style>