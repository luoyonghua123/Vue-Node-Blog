const router = require('koa-router')()
const AdminController=require('../controller/admin');
const jwtAuth=require('koa-jwt');//认证
const config=require('../config');
const AdminModel = require('../models/AdminModel');
const AdvertiseController = require('../controller/advertise');
router.prefix('/api/v1')

//注册管理员
router.post('/admin/register', AdminController.createAdmin);

//管理员登录
router.post('/admin/login', AdminController.login);

//认证接口 get/admin/auth 请求头携带 token 获取用户信息
router.get('/admin/auth',jwtAuth({
  secret: config.security.secretKey
}),AdminController.getUserInfo)

router.get('/admin/userInfo',AdminController.getAllUserInfo)

router.post('/admin/:_id',AdminController.updateUserInfo)


module.exports = router
