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
       const statement = `
       # 查询动态（单个）的评论内容和标签列表+用户头像和动态配图
       SELECT 
         m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
         JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author,
         IF(COUNT(l.id),JSON_ARRAYAGG(
           JSON_OBJECT('id', l.id, 'name', l.name)
         ),NULL) labels,
         (SELECT IF(COUNT(c.id),JSON_ARRAYAGG(
           JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt,
                       'user', JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatarUrl', cu.avatar_url))
         ),NULL) FROM comment c LEFT JOIN user cu ON c.user_id = cu.id WHERE m.id = c.moment_id) comments,
         (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8888/moment/images/', file.filename)) 
         FROM file WHERE m.id = file.moment_id) images
       FROM moment m
       LEFT JOIN user u ON m.user_id = u.id
       LEFT JOIN moment_label ml ON m.id = ml.moment_id
       LEFT JOIN label l ON ml.label_id = l.id
       WHERE m.id = ?
       GROUP BY m.id;
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
    (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
    (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount,
    (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8888/moment/images/', file.filename)) 
    FROM file WHERE m.id = file.moment_id) images
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
  // 判断动态是否已经绑定标签
  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result[0] ? true: false;
  }
  // 为动态添加标签
  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result;
  }

}

module.exports = new MomentService()
