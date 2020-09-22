const router = require('koa-router')()
const CommentController=require('../controller/comment')
const jwtAuth = require('koa-jwt');//认证
const config = require('../config')
router.prefix('/api/v1')

//创建评论
router.post('/comment',CommentController.createComment);

//获取评论列表
router.get('/comment',CommentController.getCommentList)

//获取评论详情
router.get('/comment/:_id',CommentController.getCommentDetailById)

//更新评论
router.put('/comment/:_id', jwtAuth({
  secret: config.security.secretKey
}),CommentController.updateCommentById)

//删除评论
router.delete('/comment/:_id', jwtAuth({
  secret: config.security.secretKey
}), CommentController.deleteCommentById)

router.get('/comment/target/list',CommentController.getTargetComments)
module.exports = router