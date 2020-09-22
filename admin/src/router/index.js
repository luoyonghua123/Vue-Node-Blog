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
    path: '/login',
    meta: {
      title: "登录",
      noAuth: true
    },
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/',
    component: ()=>import ('@/views/layout.vue'),
    children: [
      {
        path: '',
        name: "index",
        component: () => import('@/views/index.vue')
      },
      // 管理员
      {
        path: "admin",
        name: 'admin',
        
        component: () => import('../views/admin/list.vue')
      },
      // 
      {
        path: "category",
        name: 'category',
        component: () => import('../views/category/list.vue')
      },
      {
        path: "/category/create",
        name: "category/create",
        component: () => import('../views/category/create.vue')
      },
      {
        path: "/category/update/:id",
        name: "category/update",
        component: () => import('../views/category/update.vue')
      },
      {
        path: "article",
        name: 'article',
        component: () => import('../views/article/list.vue')
      },
      {
        path: 'article/create',
        name: 'article/create',
        component: () => import('../views/article/create.vue')
      },
      {
        path: 'article/update/:id',
        name: 'article/update',
        component: () => import('../views/article/update.vue')
      },
      {
        path: 'advertise',
        name: 'advertise',
        component: () => import('../views/advertise/list.vue')
      },
      {
        path: 'advertise/create',
        name: 'advertise/create',
        component: () => import('../views/advertise/create.vue')
      },
      {
        path: 'advertise/update/:id',
        name: 'advertise/update',
        component: () => import('../views/advertise/update.vue')
      },
      {
        path: 'comments',
        name: 'comments',
        component: () => import('../views/comments/list.vue')
      },
      {
        path: 'reply/:comment_id',
        name: 'reply',
        component: () => import('../views/reply/list.vue')
      },

    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
