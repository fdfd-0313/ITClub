const app = require('./app')
const config = require('./app/config')
require('./app/database')

app.listen(8888, () => {
  console.log(`服务器${APP_PORT}启动成功`)
})
 