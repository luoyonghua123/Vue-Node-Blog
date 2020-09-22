const AdminModel=require('../models/AdminModel')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
const {generateToken}=require('../core/util')
const { registerValidator, loginValidator } = require('../validators/admin')
const LoginManager=require('../services/login')
const { Resolve } = require('../lib/helper')
const res = new Resolve();
class AdminController{
  //管理员注册
  static async createAdmin(ctx,next){
    // 注册参数校验
    registerValidator(ctx); 
    //获得前端请求体的数据 
    const {nickname,password}=ctx.request.body;
    console.log(nickname,password);
    
    //检验账号已经存在
    const adminUser=await AdminModel.findOne({nickname});
    if(adminUser){
      //错误处理
      throw new global.errs.Existing('管路员已存在')
     
    }
    //存到数据库
    const admin=await AdminModel.create({
      nickname,
      password:password
    })
    //返回结果
    ctx.status=200;
    // ctx.body={
    //   code:200,
    //   msg:'success',
    //   errorCode:0,
    //   admin
    // }
    ctx.body=res.success('创建管理员成功');
  }
  //管理员登录
  static async login(ctx,next){
    //参数检验
    loginValidator(ctx);
    const { nickname, password } = ctx.request.body;

    const userInfo=await LoginManager.adminLogin({nickname,password});

    // ctx.body = {
    //   code: 200,
    //   msg: '登录成功',
    //   userInfo
    // }
    ctx.body=res.json(userInfo,'登录成功');
  }
  //认证 获取用户信息

  static async getUserInfo(ctx,next){
    //一旦认证成功 当前的用户的_id就会保存在ctx.state.user中
    //获得用户的_id
    const _id=ctx.state.user.data;
    console.log(ctx.state.user.data);
    
    const userInfo=await AdminModel.findById({_id});
    if(!userInfo){
      throw new global.errs.AuthFailed('账号不存在或者密码不正确');
    }
    ctx.status=200;
    // ctx.body={
    //   _id:userInfo._id,
    //   nickname:userInfo.nickname
    // }
    ctx.body=res.json({
      _id:userInfo._id,
      nickname:userInfo.nickname
    })
  }
  //获取所有用户信息
  static async getAllUserInfo(ctx,next){
    let data=await AdminModel.find().lean();
    ctx.status = 200;
    ctx.body=res.json(data)
  }
  //更新用户信息
  static async updateUserInfo(ctx,next){
    const _id = ctx.params._id;
   
    
    console.log(_id);
    
    const admin=await AdminModel.findByIdAndUpdate({ _id }, ctx.request.body).lean()
    if (!admin) {
      throw new global.errs.NotFound('没有找到这个用户')
    }
    ctx.status = 200;
    ctx.body = res.success('更新用户信息成功')
  }
}
module.exports=AdminController;