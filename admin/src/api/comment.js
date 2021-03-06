import fetch from './fetch'
export default {
  // 获取评论列表
  list(params) {
    return fetch.get('/comment', params);
  },
  // 删除评论
  destroy(params) {
    return fetch.delete('/comment/' + params.id)
  }
}