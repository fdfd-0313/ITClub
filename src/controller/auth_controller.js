const jwt = require('jsonwebtoken')
const {PRIVATE_KEY}= require('../app/config')

class AuthControler{
  async login(ctx,next){
    const {id,name} = ctx.user
    const token = jwt.sign({id,name},PRIVATE_KEY,{
      expiresIn: 60 * 60 * 24,
      algorithm:'RS256'
    })
    ctx.body = {id,name,token}
  }

  async success(ctx,next){
    const {id,name} = ctx.user
    const authorizateSuc = {
      id:id,
      user:name,
      authorization: "ture"
    }
    ctx.body = authorizateSuc
  }
}

module.exports = new AuthControler()
