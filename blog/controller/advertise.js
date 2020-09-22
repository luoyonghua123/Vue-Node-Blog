const AdminController = require("./admin");
const {advertiseValidator}=require('../validators/advertise')
const AdvertiseModel=require('../models/AdvertiseModel')
const { Resolve } = require('../lib/helper');
const res = new Resolve();

class AdvertiseController{

  //添加广告
  static async createAdvertise(ctx,next){
    //校验参数
    advertiseValidator(ctx);
    const{title}=ctx.request.body;
    const advertise=await AdvertiseModel.findOne({title});
    if(advertise){
      throw new global.errs.Existing('该广告已经存在')
    }
    await AdvertiseModel.create(ctx.request.body);
    ctx.body=res.success('添加广告成功')
  }
  //获取广告列表
  static async getAdvertiseList(ctx,next){
    const advertiseList=await AdvertiseModel.find().sort({_id:-1}).lean();
    ctx.status=200;
    ctx.body=res.json(advertiseList)
  }
  //获取广告详情
  static async getAdvertiseDetailById(ctx,next){
    const _id=ctx.params._id;
    //lean属性的作用：转换mongoose查询结果类型，从MongooseDocuments转换为JS Object，从而便于我们修改查询结果。
    const advertise=await AdvertiseModel.findById({_id}).lean();
    if(!advertise){
      throw new global.errs.NotFound('该广告不存在')
    }
    ctx.status=200;
    ctx.body=res.json(advertise)
  }

  //更新广告
  static async updateAdvertiseById(ctx,next){
    const _id=ctx.params._id;
    const advertise=await AdvertiseModel.findByIdAndUpdate({_id},ctx.request.body).lean();
    if(!advertise){
      throw new global.errs.NotFound('没有找到这个广告')
    }
    ctx.status=200;
    ctx.body=res.success('更新广告成功')
  }
  //删除广告
  static async deleteAdvertiseById(ctx, next) {
    const _id = ctx.params._id;
    const advertise = await AdvertiseModel.findByIdAndDelete(_id).lean();
    if (!advertise) {
      throw new global.errs.NotFound('没有找到这个广告')
    }
    ctx.status = 200;
    ctx.body = res.success('删除广告成功')
  }
}
module.exports = AdvertiseController