const fs = require('fs')

const userService = require('../service/user_service')
const fileService = require('../service/file_service')
const { AVATAR_PATH } = require('../constants/file_path')


class UserController {
  // 创建用户
  async create(ctx,next){
  const user = ctx.request.body
  const results = await userService.create(user)
  ctx.body = results
  }
  // 获取用户头像
  async avatarInfo(ctx,next){
    const { userId } = ctx.params
    const avatarInfo = await fileService.getAvatarByUserId(userId)
  // 提供图像信息
     ctx.response.set('content-type', avatarInfo.mimetype);
     ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
  }
}

module.exports = new UserController();
