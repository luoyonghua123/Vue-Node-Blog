<template>
  <section>
    <Button type="primary" @click="toPathLink('/advertise/create')" icon="md-add" style="margin-bottom: 16px;">新增广告
    </Button>

    <section v-if="advertiseList.length > 0">
      <Table border :columns="columns" :data="advertiseList">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="update(row._id)">编辑</Button>
          <Button type="error" size="small" @click="destroy(row._id)">删除</Button>
        </template>
      </Table>
    </section>

  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "list",
    data() {
      return {
        advertiseList: [],
        // {
        //     _id:1,
        //     title:'百度一下',
        //     link:'http://www.baidu.com'
        //   }
        page: null,
        columns: [
          // {
          //   title: 'ID',
          //   key: 'id',
          //   width: 80,
          //   align: "center"
          // },
          {
            title: '广告名称',
            key: 'title'
          },
          {
            title: '广告链接',
            render: (h, params) => {
              return h('a', {
                attrs: {
                  href: params.row.link,
                  target: '_blank'
                },
                style: {
                  color: '#2d8cf0'
                },
              }, params.row.link);
            }
          },
          {
            title: '操作',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ]
      }
    },
    created() {
      this._getAdvertiseList();
    },
     watch: {
    $route(to, from) {
      this._getAdvertiseList();
    }
  },
    methods: {
     ...mapActions({
       getAdvertiseList:'advertise/getAdvertiseList',
      deleteAdvertise:'advertise/deleteAdvertise'
     }),
     async _getAdvertiseList(){
       const res=await this.getAdvertiseList();
       //console.log(res.data.data);
       this.advertiseList=res.data.data
       
     },
      // 路由跳转
      toPathLink(path) {
        this.$router.push(path)
      },
      // 更新
      update(id) {
        this.$router.push(`/advertise/update/${id}`);
      },
      // 删除广告
      destroy(id) {
        this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确定要删除该广告</p>',
                    loading: true,
                    onOk:async ()  => {
                       try {
                          await this.deleteAdvertise({id})
                        this._getAdvertiseList();
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
      }
    }
  }
</script>

<style scoped>

</style>