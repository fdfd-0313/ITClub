const connection = require('../app/database')

class AuthService {
  // 检查动态内容表的内容id和用户id是否跟已登录人的id相同
  async checkMoment (momentId,userid){
    const statement  = `SELECT * FROM moment WHERE id = ? AND user_id = ?;`;
    const [result] = await connection.execute(statement,[momentId,userid])
    return result.length === 0? false:true;

  }
}

module.exports = new AuthService()