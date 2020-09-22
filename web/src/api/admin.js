import fetch from './fetch'


export default {
  //登录
  login(params) {
    return fetch.post('/admin/login', params)
  },
  auth(params){
    return fetch.get('/admin/auth',params)
  },
  register(params){
    return fetch.post('/admin/register',params)
  }
}