const md5 = require('blueimp-md5')

const md5password = (password)=>{
  // TODO:原版有错误
  // const md5 = cryto.createHash('md5')
  // console.log(md5);
  // console.log("没有结果");
  // const restult = md5.update(password).digest('hex')
  const result = md5(password)
  return result
}

module.exports = md5password
