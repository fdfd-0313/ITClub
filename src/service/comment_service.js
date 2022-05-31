const connection = require('../app/database')

class CommentService{
  // 创建评论
  async create(momentId,content,userId){
    const statement = `INSERT INTO comment (content,moment_id,user_id) VALUES(?,?,?);`;
    const [result] = await connection.execute(statement,[content,momentId,userId])
    return result
  }
  // 回复评论
  async reply(momentId,content,userId,commentId){
    // console.log(momentId,content,userId,commentId);
    // 回复评论
    /* 参数：
    {
      content:回复评论内容,
      moment_id:在哪条动态内容下评论
      user_id:哪个登录用户评论
      comment_id:在哪条评论的回复评论
    }
    */
    const statement= `INSERT INTO comment (content,moment_id,user_id,comment_id) VALUES(?,?,?,?);`
    const [result] = await connection.execute(statement,[content,momentId,userId,commentId]);
    return result
   }
  //  修改评论
  async update(commentId, content) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?`;
    const [result] = await connection.execute(statement, [content, commentId]);
    return result;
  }
  // 删除评论
  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?`;
    const [result] = await connection.execute(statement, [commentId]);
    return result;
  } 
  // 获取评论
  async getCommentByMomentId(momentId) {
    const statement = `
    SELECT 
    m.id, m.content, m.comment_id commendId, m.createAt createTime,
    JSON_OBJECT('id', u.id, 'name', u.name) user
    FROM comment m
    LEFT JOIN user u ON u.id = m.user_id
    WHERE moment_id = ?;			
    `;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }

}

module.exports = new CommentService()