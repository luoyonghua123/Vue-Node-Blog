import article from '../../api/article'
const state = {
  
};
const mutations = {};
const actions = {
  async list({commit,state},params){
    const res=article.list(params);
    return res;
  },
  async detail({commit,state},params){
    const res=await article.detail(params);
    return res
  }
};

export default {
  //命名空间
  namespaced: true,
  state,
  mutations,
  actions
}