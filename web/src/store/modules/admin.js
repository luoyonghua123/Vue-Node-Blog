import admin from '../../api/admin'
const state = {
  userInfo:null
};
const mutations = {
  SET_USER_INFO(state,user){
    state.userInfo=user;
  }
};
const actions = {
  async adminLogin({ commit,state }, params) {
   let res=await admin.login(params);
   return res
  },
  async adminAuth({commit},params){
    let res=await admin.auth(params);
    commit('SET_USER_INFO',res.data.data);
    return res
  },
  async adminRegister({commit},params){
    let res=await admin.register(params);
    return res;
  }
};

export default {
  //命名空间
  namespaced: true,
  state,
  mutations,
  actions
}