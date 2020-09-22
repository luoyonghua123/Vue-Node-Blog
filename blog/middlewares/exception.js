const {HttpException}=require('../core/http-exception')
const bouncer = require('koa-bouncer');
const catchError=async (ctx,next)=>{
  try {
    
    await next()
  } catch (error) {
    console.log(error);
    //权限错误 401
    if(error.status===401){
      ctx.status=401;
      ctx.body={
        request: `${ctx.method} ${ctx.path}`,
        errorCode:error.status,
        msg: error.originalError ? error.originalError.message:error.message,
        message:'请求头中需要令牌token'
      };
      return;
    }
    //判断校验类型错误
    if (error instanceof bouncer.ValidationError) {
      ctx.body = {
        name: error.name,
        message: error.message,
        request: `${ctx.method} ${ctx.path}`
      };
      return;
    }

    const isHttpException = error instanceof HttpException;
    if(isHttpException){
      ctx.status=error.code;
      ctx.body={
        request:`${ctx.method} ${ctx.path}`,
        msg:error.msg,
        error_code:error.errorCode
      }
    }else{
      //未知错误
      ctx.status=500;
      ctx.body={
        request: `${ctx.method} ${ctx.path}`,
        msg: '未知错误',
        error_code:9999
      }
    }
  }

}
module.exports=catchError