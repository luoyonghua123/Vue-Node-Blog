import fetch from './fetch'

export default {
  //创建回复
  create(params) {
    return fetch.post('/reply', params)
  }
}