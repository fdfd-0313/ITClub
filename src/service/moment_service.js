const connection = require("../app/database")

const sqlFragment = `
 SELECT
 m.id id, m.content content,m.createAt createTime,m.updateAt updayeTime,
 JSON_OBJECT('id', u.id, 'name', u.name) user 
 FROM moment m
 LEFT JOIN user u ON u.id = m.user_id`;

class MomentService {
  // 发布动态内容
  async create(userId, content) {
    const statement = `INSERT INTO moment (content,user_id) VALUES(?,?);`
    const result = await connection.execute(statement, [content, userId])
    return result[0]
  }
  // 获取动态内容（单个）
  async getMomentById(id) {
    const statement = `
    ${sqlFragment}
       WHERE m.id = 1;
    `;
    const [result] = await connection.execute(statement, [id])
    return result[0]
  }
  // 获取动态内容（列表）
  async getMomentList(offset,size){
    const statement = `
    ${sqlFragment}
       LIMIT ?, ?;
    `;
    const [result] = await connection.execute(statement, [offset,size])
    return result

  }
  // 修改动态内容
  async update(content,momentId){
  const statement = `UPDATE moment SET content =? WHERE id = ? ;`;
  const [result] = await connection.execute(statement,[content,momentId])
  return result
  }
  // 删除动态内容
  async remove(momentId){
    const statement = `DELETE FROM moment WHERE id = ?;`;
    const [result] = await connection.execute(statement,[momentId])
    return result
  }

}

module.exports = new MomentService()
