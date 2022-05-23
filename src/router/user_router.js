const Router = require('koa-router')

const {create } = require('../controller/user_controller')
const {verifyUser}=require('../middleware/user_middleware')


const userRouter = new Router({prefix:'/users'})

userRouter.post('/',verifyUser,create)


module.exports = userRouter
 