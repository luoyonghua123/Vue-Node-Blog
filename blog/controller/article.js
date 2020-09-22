const { articleValidator}=require('../validators/article')
const ArticleModel=require('../models/ArticleModel')
const CommentModel=require('../models/CommentModel')
const ReplyModel = require('../models/ReplyModel')
const Comment=require('./comment')
const { Resolve } = require('../lib/helper')
const res = new Resolve();
class ArticleController{
  //创建文章
  static async createArticle(ctx,next){
    articleValidator(ctx);
    const {title}=ctx.request.body;
    const hasArticle = await ArticleModel.findOne({title})
    if(hasArticle){
      throw new global.errs.Existing('文章已经存在');
    }
    await ArticleModel.create(ctx.request.body);
    ctx.body=res.success('文章创建成功')
  }
  //获取文章
  static async getArticleList(ctx,next){
    //分类id 分页码 分页数 关键字
    let { category_id = null, currentPage=1,pageSize=4,keyword}=ctx.query
   
    //是否存在分类id
    let filter={};
    if (category_id){
      filter.category_id=category_id;
      //判断category_id是否存在
      const article = await ArticleModel.findOne({ category_id })
      if (!article) {
        throw new global.errs.NotFound('该分类下不存在文章')
      }
    }
    //转整型
    currentPage = parseInt(currentPage);
    pageSize=parseInt(pageSize);
       
    //获取总数量
    const total = await ArticleModel.find().where(filter).countDocuments();
    const articleList = await ArticleModel.find()
      .where(filter)//条件 category_id
      .skip(pageSize * (currentPage-1)) //跳过多少条
     .limit(pageSize)//显示多少条
     .or([
       {
         keyword:{
           $regex:new RegExp(keyword,'i')//i 表示不区分大小写
         }
       }
     ])
     .sort({_id:-1})//倒序
     .populate('category_id')//连表查询 可以查询显示链接到的那条数据
    .lean()
     
     const data={
       articleList,
       currentPage,
       pageSize,
       total
     }
     ctx.body=res.json(data)
  }
  //更新文章
  static async  updateArticleById(ctx,next){
    let _id=ctx.params._id;
    
    let article=await ArticleModel.findByIdAndUpdate({_id},ctx.request.body);
    if(!article){
      throw new global.errs.NotFound('该文章不存在');
    }
    ctx.status=200;
    ctx.body=res.success('更新文章成功')
  }
  //获取文章详情
  static async getArticleDetailById(ctx,next){
    const _id=ctx.params._id;
    const articleDetail = await  ArticleModel.findById({ _id }).populate('category_id')
    if(!articleDetail){
      throw new global.errs.NotFound('没有找到相应的文章');
    }
    //console.log(articleDetail);
    
    //更新文章浏览数
    await ArticleModel.findByIdAndUpdate({_id},{browse:++articleDetail.browse})
    //获取文章下的评论列表
    // let commentList=await CommentModel.find({target_id:articleDetail._id}).sort({_id:-1}).lean();

    let commentList=await Comment.targetComment({target_id:_id});
    console.log(commentList);
    
    ctx.status=200;
    //获取评论下回复列表
    let newCommentList = await Promise.all((commentList.data).map(async comment => {
      let replyList = await ReplyModel.find({
        comment_id: comment._id
      })
      comment.replyList = replyList;
      return comment;
    }))
    
    
    let data={
      articleDetail,
      commentList:newCommentList,
      comment_currentPage: commentList.currentPage,
      comment_pageSize: commentList.pageSize,
      comment_total: commentList.total,
      comment_total_pages: commentList.total_pages
    }
    ctx.body=res.json(data)
   
  }

  //删除文章
  static async deleteArticleById(ctx,next){
    const _id = ctx.params._id;
    let article=await ArticleModel.findByIdAndDelete(_id);
    console.log(_id);
    
    console.log(article);
    
    if(!article){
      throw new global.errs.NotFound('没有找到相应的文章');
    }
    ctx.body = res.success('删除文章成功')
  }
  //上传图片
  static async uploadCoverImg(ctx,next){
    ctx.body=res.json(ctx.req.file.filename)
  }
}


module.exports=ArticleController