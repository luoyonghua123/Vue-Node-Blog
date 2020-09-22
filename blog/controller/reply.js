const ReplyModel=require('../models/ReplyModel')
const CommentModel=require('../models/CommentModel')
const replyValidator=require('../validators/reply')
const { Resolve } = require('../lib/helper')
const res = new Resolve();
class ReplyController{
  static async createReply(ctx,next){
      //参数校验
      replyValidator(ctx);
      const {comment_id}=ctx.request.body;
      const comment=await CommentModel.findById({
        _id:comment_id
      })
      if(!comment){
        throw new global.errs.NotFound('没有找到该条评论')
      }
      const reply=await ReplyModel.create(ctx.request.body);
      ctx.body=res.json(reply)
  }
  //获取评论下的回复列表
  static async getReplyListByCommentId(ctx,next){
    const comment_id=ctx.query.comment_id;
    const { currentPage = 1, pageSize = 4 } = ctx.query;
    //获取总数
    const total = await ReplyModel.find({comment_id}).countDocuments();
    const replyList = await ReplyModel.find({ comment_id })
      .skip(parseInt((currentPage - 1) * pageSize))
      .limit(parseInt(pageSize))
      .sort({ _id: -1 })
      if(!replyList.length){
        throw new global.errs.NotFound('没有该评论');
      }
    const data = {
      replyList,
      total,
      currentPage: parseInt(currentPage),
      pageSize: parseInt(pageSize)
    }
    ctx.status=200;
    ctx.body = res.json(data);
  }
  //获取该评论下的回复详情内容
  static async getReplyDetailById(ctx,next){
    const _id=ctx.params._id;
    const replyDetail=await ReplyModel.findById({_id});
    if(!replyDetail){
      throw new global.errs.NotFound('该回复已经删除或者不存在')
    }
    ctx.status=200;
    ctx.body=res.json(replyDetail)

  }

  //更新回复
  static async updateReplyById(ctx,next){
    const _id=ctx.params._id;
    const reply= await ReplyModel.findByIdAndUpdate(_id,ctx.request.body);
    if(!reply){
      throw new global.errs.NotFound('没有找到该回复');
    }
    ctx.status=200;
    ctx.body=res.success('更新回复成功')
  }
  //删除回复
  static async deleteReplyById(ctx, next) {
    const _id = ctx.params._id;
    const reply = await ReplyModel.findByIdAndDelete(_id);
    if (!reply) {
      throw new global.errs.NotFound('没有找到该回复');
    }
    ctx.status = 200;
    ctx.body = res.success('删除回复成功')
  }
}


module.exports=ReplyController
  
