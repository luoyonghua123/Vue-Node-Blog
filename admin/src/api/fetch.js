import axios from 'axios'
import qs from 'qs'
import Vue from "vue";
import router from "../router";
let fetch=axios.create({
  baseURL:"http://localhost:3001/api/v1",
  timeout:1000
})
// 添加请求拦截器
fetch.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 获取令牌 给后端
  const admin_token = localStorage.getItem('admin_token');
  if (admin_token) {
    // 设置请求头 Authorization
    config.headers.common.Authorization = `Bearer ${admin_token}`;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
export default {
  get(url, params = {}) {
    return fetch({
      method: 'get',
      url,
      params
    })
  },
  post(url, params = {}) {
    return fetch({
      method: 'post',
      url,
      data: qs.stringify(params),
    })
  },
  put(url, params = {}) {
    return fetch({
      method: 'put',
      url,
      data: qs.stringify(params),
    })
  },
  delete(url, params = {}) {
    return fetch({
      method: 'delete',
      url,
      params
    })
  }
}