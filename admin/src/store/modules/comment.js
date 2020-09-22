import comment from "../../api/comment";
const state = {};
const mutations = {};
const actions = {
  async getCommentList({commit,state},params){
    const res=await comment.list(params);
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