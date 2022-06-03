const Router = require ('koa-router')

const {
  create,
  list
} = require('../controller/label_contrller')
const {
  verifyAuth
} = require('../middleware/auth_middleware')

const labelRouter = new Router ({prefix: '/label'})

// 创建标签
labelRouter.post('/',verifyAuth,create)
// 获取标签列表
labelRouter.get('/', list);


module.exports = labelRouter