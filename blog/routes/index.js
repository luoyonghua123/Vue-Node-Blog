const router = require('koa-router')()
const ArticleModel=require('../models/ArticleModel')
const AdvertiseModel = require('../models/AdvertiseModel')
const CategoryModel = require('../models/CategoryModel')
const CommentModel = require('../models/CommentModel')
const ReplyModel=require('../models/ReplyModel')
const MongoDb=require('../db');
const comment = require('../validators/comment')
MongoDb.connect();
router.get('/', async (ctx, next) => {
  // await ctx.render('index', {
  //   title: '我的博客!'
  // })
  ctx.state={
    title:'我的博客'
  };
  //获取参数
  let { category_id = null, currentPage = 1, pageSize = 4, keyword } = ctx.query

  //是否存在分类id
  let filter = {};
  if (category_id) {
    filter.category_id = category_id;
    //判断category_id是否存在
    const article = await ArticleModel.findOne({ category_id })
    if (!article) {
      throw new global.errs.NotFound('该分类不存在')
    }
  }
  //转整型
  currentPage = parseInt(currentPage);
  pageSize = parseInt(pageSize);

  //获取总数量
  const total = await ArticleModel.find().countDocuments();
  const article = await ArticleModel.find()
    .where(filter)//条件 category_id
    .skip(pageSize * (currentPage - 1)) //跳过多少条
    .limit(pageSize)//显示多少条
    .or([
      {
        keyword: {
          $regex: new RegExp(keyword, 'i')//i 表示不区分大小写
        }
      }
    ])
    .sort({ _id: -1 })//倒序
    .populate('category_id').lean()//连表查询 可以查询显示链接到的那条数据

    //获取广告
    const advertise=await AdvertiseModel.find().sort({_id:-1}).lean();
  const category = await CategoryModel.find().lean();
  const data = {
    title:'小马哥博客',
    article,
    currentPage,
    pageSize,
    total,
    advertise,
    category
  }
  await ctx.render('index',data);
})

router.get('/about', async (ctx, next) => {
  ctx.status = 200;
  ctx.response.set('Content-Type','text/html charset=utf-8');
  await ctx.render('about')
})

router.get('/article/detail/:id', async (ctx, next) => {
 //获取文章id
 const _id=ctx.params.id;
 //获取文章详情
  const article = await  ArticleModel.findById({ _id }).populate('category_id').lean();
  //获取评论
  const commentList = await CommentModel.find({target_id:article._id}).lean();

  
  //获取评论下的回复
  let replyList=[];
  for (let i = 0; i < commentList.length; i++) {
    replyList=await ReplyModel.find({
      comment_id:commentList[i]._id
    }).lean();    
  }
  console.log(replyList);
  
  await ctx.render('article-detail',{
    article,
    commentList,
    replyList
  })
})

module.exports = router
