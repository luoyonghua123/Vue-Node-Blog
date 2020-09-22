import fetch from './fetch'

export default{
  //创建评论
  create(params){
    return fetch.post('/comment',params)
  },
  targetList(params){
    return fetch.get('/comment/target/list',params)
  }
}