const router = require('koa-router')()
const ReplyController = require('../controller/reply')
const jwtAuth = require('koa-jwt');//认证
const config = require('../config')
router.prefix('/api/v1')

//创建评论回复
router.post('/reply', ReplyController.createReply);

//获取回复列表(后面拼接comment_id)
router.get('/reply', ReplyController.getReplyListByCommentId)

//获取回复详情
router.get('/reply/:_id',ReplyController.getReplyDetailById)

//更新回复
router.put('/reply/:_id', jwtAuth({
  secret: config.security.secretKey
}),ReplyController.updateReplyById)

//删除回复
router.delete('/reply/:_id', jwtAuth({
  secret: config.security.secretKey
}), ReplyController.deleteReplyById)



module.exports=router;