import category from '../../api/category'
const state = {
  
};
const mutations = {};
const actions = {
  async getCategoryList({state,commit},params){
    let res=await category.list(params);
    //console.log(res);
    
    return res
  },
  async createCategory({ state, commit }, params) {
    let res = await category.create(params)
    //console.log(res);

    return res
  },
  async deleteCategory({ state, commit }, params) {
    let res = await category.destory(params)
    return res
  }, 
  async updateCategory({ state, commit }, params) {
    let res = await category.update(params)
    return res
  },
  async getCategoryDetail({ state, commit }, params) {
    let res = await category.detail(params)
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