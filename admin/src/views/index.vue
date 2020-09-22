<template>
  <div>
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        msg:'欢迎进入博客后台管理系统'
      }
    }
  }
</script>

<style scoped>
  h1{
    text-align: center;
    margin-top: 100px;
  }
</style>