import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

//使用element-ui 组件
import './plugins/element'




//移动端自适应配置
import 'lib-flexible/flexible.js'
//import comment from '../../blog/validators/comment'


//使用富文本编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css';

Vue.use(mavonEditor)
Vue.use(VueLazyload)
Vue.config.productionTip = false

router.beforeEach(async(to,from,next)=>{
  const categoryIndex=localStorage.getItem('categoryIndex');
  if(categoryIndex){
    store.commit('category/SET_CATEGORY_INDEX',categoryIndex);
    next();
  }else{
    next();
  }
  const token=localStorage.getItem('token');
  if(token){
    // try {
      await store.dispatch('admin/adminAuth');
      next()
    // } catch (error) {
    //   setTimeout(() => {
    //     next('/login')
    //   }, 500);
    // }
  }else{
    //用户未登录
    if(to.meta.requireAuth){
      next('/login')
    }else{
       next()
    }
   
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
