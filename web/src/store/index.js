import Vue from 'vue'
import Vuex from 'vuex'
import article from './modules/article'
import advertise from './modules/advertise'
import category from './modules/category'
import reply from './modules/reply'
import comment from './modules/comment'
import admin from './modules/admin'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    article,advertise,category,reply,comment,admin
  }
})
