const Router = require('koa-router')

const {
  create, 
  detail,
  list,
  update,
  remove
} = require('../controller/moment_controller')
const { 
  verifyAuth,
  verifyPerssion
} = require('../middleware/auth_middleware')

const momentRouter = new Router({prefix: '/moment'})

momentRouter.post('/',verifyAuth,create)
momentRouter.get('/',list)
momentRouter.get('/:momentId',detail)

// 修改动态接口
// 条件：1.用户必须登录 2. 用户具备权限
momentRouter.patch('/:momentId',verifyAuth,verifyPerssion,update)
momentRouter.delete('/:momentId',verifyAuth,verifyPerssion,remove)

module.exports = momentRouter
 