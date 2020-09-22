import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//iView
import ViewUI from 'view-design'
Vue.use(ViewUI)
import 'view-design/dist/styles/iview.css';
//使用mavonEditor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor);

import './assets/style/admin.css'
Vue.config.productionTip = false

router.beforeEach(async(to,from,next)=>{
  const admin_token=localStorage.getItem('admin_token');
  if(admin_token){
    await store.dispatch('admin/adminAuth');
  }else{
    //用户未登录
    if(to.meta.noAuth){
      next();
    }else{
      Vue.prototype.$Message.error('权限未授权,请登录')
      setTimeout(() => {
        next('/login')
      }, 1500);
    }
  }
  next();
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
