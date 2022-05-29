const jwt = require('jsonwebtoken')

const errorTypes = require('../constants/error_types')
const userServiece = require('../service/user_service')
const authServiece = require('../service/auth_service')
const md5password = require('../utils/password_handle')
const {PUBLIC_KEY} = require('../app/config')

// 用户登录验证中间件 
const verifyLogin = async(ctx,next)=>{
  console.log('验证登录成功的midleware');
  // 1. 获取用户名和密码
  const {name, password} = ctx.request.body

  // 2.判断用户名和密码是否为空
  if(!name ||!password || name ===''||password ===''){
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error',error,ctx) 
 }

  // 3. 判断用户是否存在
  const result = await userServiece.getUserByName(name);
  const user = result[0];
  // console.log(user);
  if(!user){
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS)
    return ctx.app.emit('error',error,ctx) 
  }

  // 4. 判断密码是否与数据库的存储一致
  if(md5password(password) != user.password){
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT)
    return ctx.app.emit('error',error,ctx) 
  }
  ctx.user = user;
  await next();
}
// 授权验证中间件
const verifyAuth = async(ctx,next)=>{
  console.log('验证授权的midleware');
  // 1. 获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit('error', error, ctx);
  }
  const token = authorization.replace('Bearer ','')
  // 2. 验证token
 try{
  const result = jwt.verify(token,PUBLIC_KEY,{
    algorithms:["RS256"]
  });
  ctx.user = result
  // console.log(ctx.user)
  await next();
 }catch(err){
  const error = new Error(errorTypes.UNAUTHORIZATION)
  ctx.app.emit('error',error,ctx)
 }
}

// 验证已登录用户是否具备修改内容权限中间件
const verifyPerssion = async(ctx,next)=>{
  console.log("验证已登录用户是否具备修改内容权限middleware");
  // 1.获取用户参数
  const { momentId } = ctx.params
  const { id } = ctx.user
  // console.log(momentId,id);

  // 2.查询是否具备权限
  try{
    const isPermission = await authServiece.checkMoment(momentId,id)
    if(!isPermission) throw new Error()
  }catch(err){
    const error = new Error(errorTypes.UNPERMISSION)
    return ctx.app.emit('error',error,ctx)
  } 
  await next()
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPerssion
}
