const {commentValidator}=require('../validators/comment')
const CommentModel=require('../models/CommentModel')
const ReplyModel=require('../models/ReplyModel')
const { Resolve } = require('../lib/helper')
const res = new Resolve();
class CommentController{
  //创建评论  
  static async createComment(ctx,next){
    //校验参数
    commentValidator(ctx);
    let newComment=await CommentModel.create(ctx.request.body);
    console.log(ctx.request.body);
    console.log(ctx.query);
    
    ctx.body=res.json(newComment)
  }
  //获取所有的文章评论列表 进行分页操作
  static async getCommentList(ctx,next){
    const { currentPage=1,pageSize=4}=ctx.query;
    //获取总数
    const total=await CommentModel.find().countDocuments();
    //分页
    const commentList=await CommentModel.find()
      .skip(parseInt((currentPage-1)*pageSize))
    .limit(parseInt(pageSize))
    .sort({_id:-1})
    ctx.status=200;
    const data={
      commentList,
      total,
      currentPage:parseInt(currentPage),
      pageSize:parseInt(pageSize)
    }
    ctx.body=res.json(data);
    }
    //获取评论详情
  static async getCommentDetailById(ctx,next){
    const _id=ctx.params._id;
    const commentDetail=await CommentModel.findById({_id}).lean();
    if(!commentDetail){
      throw new global.errs.NotFound('么有找到该评论')
    }
    //todo: 获取该评论回复列表
    const replyList=await ReplyModel.find({comment_id:commentDetail._id}).lean()
    ctx.status=200;
    let data={
      commentDetail,
      replyList
    }
    ctx.body=res.json(data)
  }

  static async updateCommentById(ctx,next){
    const _id=ctx.params._id;
    const comment=await CommentModel.findByIdAndUpdate(_id,ctx.request.body);
    if (!comment){
      throw new global.errs.NotFound('没有找到该评论');
    }
    ctx.status=200;
    ctx.body=res.success('更新评论成功')
  }

  static async deleteCommentById(ctx,next){
    const _id = ctx.params._id;
    const comment = await CommentModel.findOneAndDelete(_id);
    if (!comment) {
      throw new global.errs.NotFound('没有找到该评论');
    }
    ctx.status = 200;
    ctx.body = res.success('删除评论成功')
  }

  static async targetComment(params={}){
    const {target_id,currentPage=1}=params;
    const pageSize=4;
    const total=await CommentModel.find({target_id}).countDocuments()
    let comment=await CommentModel.find({target_id})
      .skip(parseInt((currentPage - 1) * pageSize))
      .limit(parseInt(pageSize))
      .sort({ _id: -1 })
      .lean();
    //console.log(comment);
    
    // //获取评论下回复列表
    // let commentList = await Promise.all((comment).map(async comment => {
    //   let replyList = await ReplyModel.find({
    //     comment_id: comment._id
    //   })
    //   comment.replyList = replyList;
    //   return comment;
    // }))

    return{
      data: comment,
      currentPage:parseInt(currentPage),
      pageSize:parseInt(pageSize),
      total:parseInt(total),
      //总页数
      total_pages:Math.ceil(total/pageSize)
    }
  }
  static async getTargetComments(ctx,next){
    //{target_id,currentPage}=ctx.query
    const commentList=await CommentController.targetComment(ctx.query);
    ctx.status=200;
    ctx.body=res.json(commentList)
  }
}

module.exports = CommentController