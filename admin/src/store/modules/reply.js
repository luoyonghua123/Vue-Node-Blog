import reply from "../../api/reply";
const state = {};
const mutations = {};
const actions = {
  async getReplyList({commit,state},params){
   const res= await reply.list(params);
   return res
  },
  async deleteReply({ commit, state }, params) {
    const res = await reply.destroy(params);
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