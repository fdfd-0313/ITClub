const errorTypes = require('../constants/error_types')
const serviece = require('../service/user_service')
const md5password = require('../utils/password_handle')

const verifyUser = async (ctx,next)=>{
  // 1.获取用户名和密码
  const {name,password}= ctx.request.body
  // console.log(name,password);

  // 2.判断用户名或者密码不能为空
  if(!name ||!password || name ===''||password ===''){
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
  //   // 发射错误信息
  //   console.log(error);
    return ctx.app.emit('error',error,ctx)
    
  }
  // 3.判断这次注册的用户名是没有注册过的
  const results = await serviece.getUserByName(name);
  if(results.length){
    const error = new Error(errorTypes.USER_ALREADY_EXISTS)
    return ctx.app.emit('error',error,ctx)
  }
  await next();
}

const handlePassword = async(ctx,next)=>{
  const  {password} = ctx.request.body
  ctx.request.body.password = md5password(password)
 
 await next();
}

module.exports = {
  verifyUser,
  handlePassword
}
