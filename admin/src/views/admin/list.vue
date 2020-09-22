<template>
  <section>
    <Button
      type="primary"
      @click="toPathLink('/admin/create')"
      icon="md-add"
      style="margin-bottom: 16px;"
    >新增管理员</Button>

    <section v-if="list&&list.length > 0">
      <Table border :columns="columns" :data="list">
        <template slot-scope="{row}" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope='{row}' slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click='update(row._id)'>编辑</Button>
          <Button type="error" size="small" @click='destroy(row._id)'>删除</Button>
        </template>
      </Table>
    </section>
  </section>
</template>

<script>
import {mapActions}from 'vuex'
  export default {
    components: {

    },

   name: "adminlist",
  data() {
    return {
      list: [],
      page: null,
      columns: [
        {
          title: "姓名",
          key: "nickname"
        },
        
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center"
        }
      ]
    };
  },
    computed: {
     
    },
created () {
       
       this._getAllUserInfo();
        
      
        
       
         
          
      },
    methods: {
      ...mapActions({
        getAllUserInfo:'admin/getAllUserInfo'
      }),
      async _getAllUserInfo(){
        const res=await this.getAllUserInfo();
        this.list=res.data.data
     
        
      },
       update(id){
      this.$router.push(`/category/update/${id}`);
      console.log('更新分类',id);
      
    },
    async destroy(id){
      await this.deleteCategory(id)
      this._getCategoryList();
      
    },
    // 路由跳转
    toPathLink(path) {
      this.$router.push(path);
    },
    }
  }
</script>

<style scoped>
  h1 {
    font-weight: normal;
  }
</style>
