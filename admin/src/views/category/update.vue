<template>
  <section>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="分类名称" prop="name">
        <Input v-model="formValidate.name" placeholder="分类名称" />
      </FormItem>
      <FormItem label="分类关键字" prop="key">
        <Input v-model="formValidate.keyword" placeholder="分类关键字" />
      </FormItem>
      <FormItem>
        <Button @click="handleReset('formValidate')">重置</Button>
        <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">更改</Button>
      </FormItem>
    </Form>
  </section>
</template>
<script>
  import {mapActions}from 'vuex'
  export default {
    data() {
      return {
        id: this.$route.params.id,
        detail: null,
        formValidate: {
          name: '',
          keyword: ''
        },
        ruleValidate: {
          name: [
            {required: true, message: '分类名称不能为空', trigger: 'blur'}
          ],
          keyword: [
            {required: true, message: '分类关键字不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    watch: {
      $route(to, from) {
        if(to.params.id){
           this._getCategoryDetail(to.params.id)
        }
        
      }
    },
    created() {
      this._getCategoryDetail(this.id)
    },
    methods: {
      ...mapActions({
        updateCategory:'category/updateCategory',
        getCategoryDetail:'category/getCategoryDetail'
      }),
      async _getCategoryDetail(id){
        let res=await this.getCategoryDetail({id})
        this.formValidate=res.data.data
      },
      // 提交
      handleSubmit(name) {
        this.$refs[name].validate(async(valid) => {
          if (valid) {
            // 更新
           this.formValidate.id=this.$route.params.id
            
            await this.updateCategory(this.formValidate);
            console.log('更新成功');
            this.$router.push("/category");
          } else {
            this.$Message.error('请完成表单!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>
