const service = require('../service/comment_service')

class CommentController{
  // 创建评论
  async create(ctx,next){
    const { momentId, comment} = ctx.request.body
    const { id } = ctx.user
    const result = await service.create(momentId,comment,id)
    ctx.body = result
  }
  // 回复评论
  async reply(ctx,next){
    const { momentId, content} = ctx.request.body
    const {commentId} = ctx.params
    const { id } = ctx.user
    const result = await service.reply(momentId,content,id,commentId,)
    ctx.body = result
  }
  async update(ctx, next) {
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;
    const result = await service.update(commentId, content);
    ctx.body = result;
  }
  
  async remove(ctx, next) {
    const { commentId } = ctx.params;
    const result = await service.remove(commentId);
    ctx.body = result;
  }
  async list(ctx,next){
    const { momentId } = ctx.query
    const result = await service.getCommentByMomentId(momentId)
    ctx.body = result 
  }

}

module.exports = new CommentController()