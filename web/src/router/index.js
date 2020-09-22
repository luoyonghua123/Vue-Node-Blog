import Vue from 'vue'
import VueRouter from 'vue-router'

//import HelloWorld from '@/components/HelloWorld'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

  const routes = [
  {
    path:'/',
    redirect:'/home',
    name:"home",
    component: () => import('@/views/Index.vue'),
    children:[
      {
        path: '/home',
        name: 'article-list',
        component: () => import("../views/articles/list.vue")
      },
      {
        path: '/article/detail',
        name: 'article-detail',
        meta:{
          requireAuth:true
        },
        component: () => import('../views/articles/detail.vue')
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component:()=>import ('../views/login/index.vue')
  },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register/index.vue')
    }
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass:'nav-item-active'
})

export default router
