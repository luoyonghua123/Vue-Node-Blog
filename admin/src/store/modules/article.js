import article from '../../api/article'
const state = {};
const mutations = {};
const actions = {
  async getArticleList({commit},params){
    let res=await article.list(params);
    return res
  },
  async createArticle({ commit }, params) {
    let res = await article.create(params);
    return res
  },
  async updateArticle({ commit }, params) {
    let res = await article.update(params);
    return res
  },
  async getArticleDetail({ commit }, params) {
    let res = await article.detail(params);
    return res
  },
  async updateArticle({ commit }, params) {
    let res = await article.update(params);
    return res
  }, 
  async deleteArticle({ commit }, params) {
    let res = await article.destroy(params);
    return res
  },
};

export default {
  //命名空间
  namespaced: true,
  state,
  mutations,
  actions
}