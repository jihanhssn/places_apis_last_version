const i18n = require('i18n');
const exceptions = require('../../commons/errors/exceptions');
const commentDao = require('../comment_dao');
const userDao = require('../../user/user_dao');
const likeDao = require('../../comment_likes/comments_likes_dao');

exports.getCommentReplies = async (parentCommentId, userId, pageNumber, pageSize) => {
    const comment = await commentDao.getCommentById(parentCommentId);
    if (!comment) {
        throw new exceptions.NotFoundException(i18n.__('comment_not_found'))
    }

    const commentReplies = await commentDao.getCommentReplies(parentCommentId, pageNumber, pageSize);
    for (let comment of commentReplies) {
        if (comment.comment_likes) {
            comment.comment_likes = comment.comment_likes.map(result => result.toJSON());
            for (let commentLike of comment.comment_likes) {
                const likedUser = await userDao.getById(commentLike.user_id);
                commentLike.likedUser = likedUser;
            }
        }

        const liked = await likeDao.isLiked(comment.comment_id, userId);
        comment.is_liked = (liked !== null);
    }
    return commentReplies;
}