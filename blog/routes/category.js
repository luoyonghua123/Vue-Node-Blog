const router = require('koa-router')()
const CategoryController=require('../controller/category')
const jwtAuth = require('koa-jwt');//认证
const config = require('../config')
router.prefix('/api/v1')
//创建分类
router.post('/category', CategoryController.createCategory);
//获取所有分类
router.get('/category',CategoryController.getCategotyList)
//更新分类
router.put('/category/:_id', jwtAuth({
  secret: config.security.secretKey
}),CategoryController.updateCategoryById);
//根据_id获取该分类的详情
router.get('/category/:_id',CategoryController.getCategoryDetailById)

router.delete('/category/:_id', jwtAuth({
  secret: config.security.secretKey
}), CategoryController.deleteCategoryDetailById)
module.exports = router