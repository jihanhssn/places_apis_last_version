const i18n = require('i18n');
const exceptions = require('../../commons/errors/exceptions');
const commentDao = require('../../place_comment/comment_dao');
const commentslikesDao = require('../comments_likes_dao');

exports.getCommentLikes = async (commentId, userId) => {
    const comment = await commentDao.getCommentById(commentId);
    if (!comment) {
        throw new exceptions.NotFoundException(i18n.__('comment_not_found'));
    }
    let results = await commentslikesDao.getCommentLikes(commentId);
    return results;
}