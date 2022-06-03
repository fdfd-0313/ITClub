const connection = require('../app/database')

class UserService {
  async create(user){
    // 将user储存到用户表中
    const {name,password} = user;
    const statement = `INSERT INTO user (name,password) VALUES(?,?);`;
    const results = await connection.execute(statement,[name,password]);
    // console.log("用户存入数据库成功");
    return results[0]
  }
  async getUserByName(name){
    const statement = `SELECT *FROM user WHERE name = ?;`;
    const results = await connection.execute(statement,[name]);
    return results[0]
  }
  // 将头像URl存入user表中
  async updateAvatarUrlById(avatarUrl, userId) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [avatarUrl, userId]);
    return result;
  }

}

module.exports = new UserService();
