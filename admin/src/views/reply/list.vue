<template>
  <section>
    <div class="empty" v-if="list.length === 0">
      暂无回复
    </div>
    <section v-if="list.length > 0">
      <Table border :columns="columns" :data="list">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row }" slot="action">
          <Button type="error" size="small" @click="destroy(row._id)">删除</Button>
        </template>
      </Table>
    </section>
  </section>
</template>

<script>
import { mapActions } from "vuex";
  export default {
    name: "list",
    data() {
      return {
        comment_id: this.$route.params.comment_id,
        list: [
          // {
          //   _id:1,
          //   nickname:'小黑',
          //   content:'哈哈哈'
          // },
          // {
          //   _id:2,
          //   nickname:'小红',
          //   content:'嘿嘿嘿'
          // }
        ],
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
            title: 'Action',
            slot: 'action',
            width: 200,
            align: 'center'
          }
        ]
      }
    },
    created() {
      this._getReplyList();
    },
    methods: {
      ...mapActions({
        getReplyList:'reply/getReplyList',
        deleteReply:'reply/deleteReply'
      }),
      async _getReplyList(){
        const res=await this.getReplyList({comment_id:this.$route.params.comment_id});
        console.log(res.data.data.replyList);
        this.list=res.data.data.replyList;
      },
      reply(){

      },
      // 删除分类
      destroy(id) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除此回复评论吗？</p>',
          loading: true,
          onOk: async () => {
            try {
              await this.deleteReply(id)
              console.log(id);
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
  .empty {
    padding: 32px 0;
    text-align: center;
  }
</style>
