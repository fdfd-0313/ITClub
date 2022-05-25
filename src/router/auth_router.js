const Router = require('koa-router')

const {
  login
} = require('../controller/auth_controller')
const{
  verifyLogin
} = require('../middleware/auth_middleware')

const  authRouter = new Router({prefix:'/login'})
authRouter.post('/',verifyLogin,login)

module.exports = authRouter