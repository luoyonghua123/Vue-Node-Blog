const router = require('koa-router')()
const AdvertiseController=require('../controller/advertise')
const jwtAuth = require('koa-jwt');//认证
const config = require('../config');
const AdminController = require('../controller/admin');
const AdvertiseModel = require('../models/AdvertiseModel');


router.prefix('/api/v1')
//创建广告
router.post('/advertise', jwtAuth({
  secret: config.security.secretKey
}),AdvertiseController.createAdvertise);

//获取广告列表
router.get('/advertise',AdvertiseController.getAdvertiseList);

//获取广告详情
router.get('/advertise/:_id', AdvertiseController.getAdvertiseDetailById);

//更新广告
router.put('/advertise/:_id', jwtAuth({
  secret: config.security.secretKey
}),AdvertiseController.updateAdvertiseById)

//删除广告
router.delete('/advertise/:_id', jwtAuth({
  secret: config.security.secretKey
}),AdvertiseController.deleteAdvertiseById)
module.exports=router;