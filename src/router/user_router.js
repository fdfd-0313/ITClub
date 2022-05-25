const Router = require('koa-router')

const {create } = require('../controller/user_controller')
const {
  verifyUser,
  handlePassword
}=require('../middleware/user_middleware')


const userRouter = new Router({prefix:'/users'})

userRouter.post('/',verifyUser,handlePassword,create)


module.exports = userRouter
 