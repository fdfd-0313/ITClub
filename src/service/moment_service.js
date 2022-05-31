const connection = require("../app/database")

class MomentService {
  // 发布动态内容
  async create(userId, content) {
    const statement = `INSERT INTO moment (content,user_id) VALUES(?,?);`
    const result = await connection.execute(statement, [content, userId])
    return result[0]
  }
  // 获取动态内容（单个）
  async getMomentById(id) {
    // const statement = `
    // SELECT
    // m.id id, m.content content,m.createAt createTime,m.updateAt updayeTime,
    // JSON_OBJECT('id', u.id, 'name', u.name) user 
    // FROM moment m
    // LEFT JOIN user u ON u.id = m.user_id
    // WHERE m.id = 1;
    // `;
       const statement = `
       SELECT
       m.id id, m.content content,m.createAt createTime,m.updateAt updayeTime,
       JSON_OBJECT('id', u.id, 'name', u.name) author,
       JSON_ARRAYAGG(
       JSON_OBJECT('id',c.id,'content',c.content,'commemtId',c.comment_id,'createTime',c.createAt,
                   'user',JSON_OBJECT('id',cu.id,'name',cu.name)
                   )
       ) comments
     FROM moment m
     LEFT JOIN user u ON u.id = m.user_id
     LEFT JOIN comment c ON c.moment_id=m.id
     LEFT JOIN user cu ON c.user_id = cu.id
     WHERE m.id = 1;			
    `;
    const [result] = await connection.execute(statement, [id])
    return result[0]
  }
  // 获取动态内容（列表）
  async getMomentList(offset,size){
    const statement = `
    SELECT 
    m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
    JSON_OBJECT('id', u.id, 'name', u.name) author,
    (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount
    FROM moment m
    LEFT JOIN user u ON m.user_id = u.id
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
