const Router = require ('koa-router')

const {
  verifyAuth
} = require('../middleware/auth_middleware')
const {
  avatarHandler,
  pictureHandler,
  pictureResize
} = require('../middleware/file_middleware')
const {
  savaAvatarInfo,
  savePictureInfo
} = require('../controller/file_controller')

const fileRouter = new Router ({prefix: '/upload'})


fileRouter.post('/avatar',verifyAuth,avatarHandler,savaAvatarInfo)
fileRouter.post('/picture', verifyAuth, pictureHandler,pictureResize, savePictureInfo);


module.exports = fileRouter