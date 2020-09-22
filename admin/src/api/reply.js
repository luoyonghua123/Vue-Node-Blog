import fetch from './fetch'
export default {
  // 获取文章列表
  list(params) {
    return fetch.get('/reply', params);
  },
  destroy(id) {
    return fetch.delete('/reply/' + id);
  }
}