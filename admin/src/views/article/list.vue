<template>
  <section>
    <Button
      type="primary"
      @click="toPathLink('/article/create')"
      icon="md-add"
      style="margin-bottom: 16px;"
    >新增文章</Button>
    <section v-if="list.length > 0">
      <Table :loading="loading" border :columns="columns" :data="list">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="update(row._id)">编辑</Button>
          <Button type="error" size="small" @click="destroy(row._id)">删除</Button>
        </template>
      </Table>

      <section class="page">
        <Page
          :total="page.total"
          :page-size="page.pageSize"
          :current="page.currentPage"
          show-total
          @on-change="handlePage"
        ></Page>
      </section>
    </section>
  </section>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "list",
  data() {
    return {
      loading: false,
      list: [],
        // {
        //   _id: 1,
        //   title: "学习Vue",
        //   browse: 10,
        //   cover: "https://vuex.vuejs.org/vuex-explained-visually.png",
        //   category_id: {
        //     _id: "1",
        //     name: "Vue",
        //     keyword: "vue,vue-router",
        //     __v: 0
        //   }
        // }
      
      page: {
        
      },
      currentPage: 1,
      pageSize: 2,
      columns: [
        // {
        //   title: 'ID',
        //   key: '_id',
        //   width: 80,
        //   align: "center"
        // },
        {
          title: "文章封面",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.cover + "?imageView2/1/w/100/h/100"
              },
              style: {
                width: "80px",
                height: "80px",
                padding: "10px",
                "border-radius": "10px"
              }
            });
          }
        },
        {
          title: "文章分类",
          width: 100,
          align: "center",
          key: "category_id",
          render: (h, params) => {
            return h("div", [h("span", params.row.category_id.name)]);
          }
        },
        {
          title: "文章标题",
          key: "title"
        },
        {
          title: "浏览次数",
          width: 100,
          align: "center",
          key: "browse"
        },
        {
          title: "操作",
          slot: "action",
          width: 200,
          align: "center"
        }
      ]
    };
  },
  created() {
     this._getArticleList();
  },
  watch: {
    $route(to, from) {
      this._getArticleList();
    }
  },
  methods: {
     ...mapActions({
        getArticleList:'article/getArticleList',
        deleteArticle:'article/deleteArticle'
      }),
      async _getArticleList(){
        const res=await this.getArticleList({
          currentPage:this.currentPage,
          pageSize:this.pageSize
        });
         this.list=res.data.data.articleList;
         this.page={
           total:res.data.data.total,
          pageSize:res.data.data.pageSize,
          currentPage:res.data.data.currentPage
         }
       
        
      },
    // 切换分页
    handlePage(page) {
      this.currentPage = page;
      this._getArticleList();
    },
    // 更新
    update(id) {
      this.$router.push(`/article/update/${id}`);
    },
    // 路由跳转
    toPathLink(path) {
      this.$router.push(path);
    },
    // 删除文章
    destroy(id) {
      this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确定要删除该文章</p>',
                    loading: true,
                    onOk:async ()  => {
                       try {
                          await this.deleteArticle({id})
                        this._getArticleList();
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
    
      console.log("删除文章", id);
    }
  }
};
</script>

<style scoped>
.page {
  padding: 32px 0;
  text-align: center;
}
</style>
