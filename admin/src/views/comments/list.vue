<template>
  <section>
    <section v-if="commentList.length > 0">
      <Table border :columns="columns" :data="commentList">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="small" @click="reply(row._id)" style="margin-right: 5px">回复列表</Button>
          <Button type="error" size="small" @click="destroy(row._id)">删除</Button>
        </template>
      </Table>
      <section class="page">
        <Page :total="page.total" :page-size="page.pageSize" :current="page.currentPage" show-total
              @on-change="handlePage"></Page>
      </section>

    </section>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "list",
    data() {
      return {
        commentList: [
          // {
          //   _id:1,
          //   nickname:'小尤同学',
          //   content:'非常好 👍👍',
          //   target_type:'article'
          // }
        ],
        page: {},
        currentPage: 1,
        columns: [
          // {
          //   title: 'ID',
          //   key: 'id',
          //   width: 80,
          //   align: "center"
          // },
          {
            title: '评论人昵称',
            key: 'nickname'
          },
          {
            title: '评论内容',
            key: 'content'
          },
          {
            title: '评论类型',
            key: 'target_type',
            width: 100,
            align: "center",
            render: (h, params) => {
              return h('div', [
                h('span', params.row.target_type === 'article' ? '普通文章' : '专栏')
              ]);
            }
          },
          {
            title: '操作',
            slot: 'action',
            width: 200,
            align: 'center'
          }
        ]
      }
    },
    created() {
     this._getCommentList()
    },
    methods: {
      ...mapActions({
        getCommentList:'comment/getCommentList'
      }),
      async _getCommentList(){
        const res=await this.getCommentList();
        //console.log(res.data.data);
        this.commentList=res.data.data.commentList;
       this.page.total=res.data.data.total;
        this.page.currentPage=res.data.data.currentPage;
         this.page.pageSize=res.data.data.pageSize;
      },
      // 切换分页
      handlePage(page) {
        this.currentPage=page
        console.log(page);
        
      },
      reply(id) {
        this.$router.push('/reply/' + id)
      },
      // 删除分类
      destroy(id) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除此评论吗？</p>',
          loading: true,
          onOk: async () => {
            try {
              // 删除分类操作
              this.$Message.success('删除成功');
            } catch (e) {
              this.$Message.error(e);

            } finally {
              this.$Modal.remove();
            }

          },
          onCancel: () => {
            this.$Message.warning('取消！');
          }
        });
      }
    }
  }
</script>

<style scoped>
  .page {
    padding: 32px 0;
    text-align: center;
  }
</style>
