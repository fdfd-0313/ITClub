const errorTypes = require('../constants/error_types')

const errorHandler = (error,ctx) =>{
//  // 这里的 error.message = new Error（里面的值）
  let status,message;
  switch(error.message){
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      // console.log(error.message);
      status = 400; //Bad Request
      message = "用户名和密码不能为空"
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      status = 405; //conflict
      message = "用户名已存在"
      break;
    case errorTypes.USER_DOES_NOT_EXISTS:
      status = 400; //conflict
      message = "用户名不存在"
      break;  
    case errorTypes.PASSWORD_IS_INCORRENT:
      status = 400; //conflict
      message = "密码错误"
      break;  
    case errorTypes.UNAUTHORIZATION:
      status = 401; //unauthorization
      message = "token无效"
      break;  
    case errorTypes.UNPERMISSION:
      status = 401; //unauthorization
      message = "您不具备权限"
      break; 
    default:
      status = 404;
      message = "默认错误";
}
  ctx.status = status;
  ctx.body = message;
}

module.exports = errorHandler;
