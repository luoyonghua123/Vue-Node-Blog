const router = require('koa-router')()
const ArticleController=require('../controller/article')
const jwtAuth = require('koa-jwt');//认证
const config = require('../config')
const upload=require('../middlewares/upload')
router.prefix('/api/v1')

//创建文章
router.post('/article', jwtAuth({
  secret: config.security.secretKey
}),ArticleController.createArticle)

//获取所有文章列表
router.get('/article',ArticleController.getArticleList)

//更新文章
router.put('/article/:_id', jwtAuth({
  secret: config.security.secretKey
}),ArticleController.updateArticleById)

//获取文章详情
router.get('/article/:_id', jwtAuth({
  secret: config.security.secretKey
}),ArticleController.getArticleDetailById)

//删除文章
router.delete('/article/:_id', jwtAuth({
  secret: config.security.secretKey
}),ArticleController.deleteArticleById)

//图片上传
router.post('/upload', upload.single('avatar'),ArticleController.uploadCoverImg)
module.exports = router