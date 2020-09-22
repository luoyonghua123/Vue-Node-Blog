import fetch from './fetch'

export default{
  //登录
  login(params){
    return fetch.post('/admin/login',params);

  },
  //认证
  auth(params){
    return fetch.get('/admin/auth', params);
  },
  //注册
  register(params) {
    return fetch.post('/admin/register', params)
  },
  list(params){
    return fetch.get('/admin/userInfo',params)
  }
}