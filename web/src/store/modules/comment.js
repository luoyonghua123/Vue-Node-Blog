import comment from '../../api/comment'
import { getTargetComments } from '../../../../blog/controller/comment';

const state = {
  commentList:[],
  commentPage:null
};
const mutations = {
  //设置评论列表
  SET_COMMENT_LIST(state,list){
    state.commentList=list;
  },
  //设置评论页码
  SET_COMMENT_PAGE(state,data){
    state.commentPage=data
  }
};
const actions = {
  //创建评论
  async createComment({commit},params){
    const res=await comment.create(params)
    return res
  },

  async getTargetComments({commit},params){
    return comment.targetList(params)
  }
};

export default {
  //命名空间
  namespaced: true,
  state,
  mutations,
  actions
}