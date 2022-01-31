const i18n = require('i18n');
const exceptions = require('../../commons/errors/exceptions');
const commentDao = require('../../place_comment/comment_dao');
const commentslikesDao = require('../comments_likes_dao');

exports.removeCommentLike = async (commentId, userId) => {
    const comment = await commentDao.getCommentById(commentId);
    if (!comment) {
        throw new exceptions.NotFoundException(i18n.__('comment_not_found'));
    }
    let liked = await commentslikesDao.isLiked(commentId, userId);
    if (liked) {
        await commentslikesDao.deleteLike(liked.like_id);
        let likes_count = comment.likes_count - 1;
        return commentDao.decreaseCommentLikesCounts(commentId, likes_count);
    }
}