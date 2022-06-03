const Router = require('koa-router')

const {
  create, 
  detail,
  list,
  update,
  remove,
  addLabels,
  fileInfo
} = require('../controller/moment_controller')
const { 
  verifyAuth,
  verifyPermission
} = require('../middleware/auth_middleware')

const {
  verifyLabelExists  
} = require('../middleware/label_middleware')

const momentRouter = new Router({prefix: '/moment'})

// 创建动态
momentRouter.post('/',verifyAuth,create)
// 获取动态信息
momentRouter.get('/',list)
momentRouter.get('/:momentId',detail)

// 修改动态接口
// 条件：1.用户必须登录 2. 用户具备权限
momentRouter.patch('/:momentId',verifyAuth,verifyPermission,update)
momentRouter.delete('/:momentId',verifyAuth,verifyPermission,remove)

// 给动态添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabels);

// 动态配图
momentRouter.get('/images/:filename',fileInfo)


module.exports = momentRouter
 