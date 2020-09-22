import admin from "../../api/admin"
const state = {
  userInfo:{
    nickname:'',
    _id:''
  },
 
};
const mutations = {
  SET_USER_INFO(state,userInfo){
    state.userInfo=userInfo
  }
};
const actions = {
  async adminLogin({ commit }, params) {
    return await admin.login(params);
  },
  async adminAuth({ commit }, params) {
    const res= await admin.auth(params);
    commit('SET_USER_INFO',res.data.data);
    return res
  },
  async getAllUserInfo({ commit }, params) {
   let res=await admin.list(params);
  
   
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