<template>
  <section>
    <Button
      type="primary"
      @click="toPathLink('/category/create')"
      icon="md-add"
      style="margin-bottom: 16px;"
    >新增分类</Button>
     
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
import { mapState, mapActions } from "vuex";

export default {
  name: "list",
  data() {
    return {
      list: [],
      page: null,
      modal1:false,
      columns: [
        {
          title: "分类名称",
          key: "name"
        },
        {
          title: "分类关键字",
          key: "keyword"
        },
        {
          title: "分类下的文章数",
          key: "article_nums"
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
  created() {
    
     this._getCategoryList();
     this.getArticleTotal();
     
      
  },
  watch: {
    $route(to, from) {
     this._getCategoryList(); 
     
    }
  },
  methods: {
    ...mapActions({
      getCategoryList:'category/getCategoryList',
      deleteCategory:'category/deleteCategory',
      getArticleList:'article/getArticleList'
    }),
    async getArticleTotal(){
      
    },
    async _getCategoryList(){
    const res=await this.getCategoryList();
    this.list=res.data.data;
     
      
     for (let index = 0; index < this.list.length; index++) {
      let res1=await this.getArticleList({category_id:this.list[index]._id})
       this.$set(this.list[index], 'article_nums', res1.data.data.total);
     
    }
    
    
    },
    // 更新
    update(id){
      this.$router.push(`/category/update/${id}`);
      console.log('更新分类',id);
      
    },
    async destroy(id){
        this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确定要删除该分类</p>',
                    loading: true,
                    onOk:async ()  => {
                       try {
                          await this.deleteCategory(id)
                        this._getCategoryList();
                        this.$Message.success('删除成功');
                       } catch (error) {
                         this.$Message.error('删除失败')
                       }finally{
                         this.$Modal.remove()
                       }
                    },
                    onCancel: () => {
                        this.$Message.info('取消删除');
                    }
                });
    
      
    },
    // 路由跳转
    toPathLink(path) {
      this.$router.push(path);
    },
    ok () {
                this.$Message.info('点击了确定');
            },
            cancel () {
                this.$Message.info('点击了取消');
            }
  }
};
</script>

<style scoped>
</style>
