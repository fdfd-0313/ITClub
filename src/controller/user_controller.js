const UserService = require('../service/user_service')

class UserController {
  async create(ctx,next){
  // 获取用户请求参数
  const user = ctx.request.body
  // console.log("获取到用户");

  // 查询数据
  const results = await UserService.create(user)

  // 返回数据
  ctx.body = results
  }
}

module.exports = new UserController();
