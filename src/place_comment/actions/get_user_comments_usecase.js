const commentDao = require('../comment_dao');
const userDao = require('../../user/user_dao');
const likeDao = require('../../comment_likes/comments_likes_dao');

exports.getUserComment = async (userId, pageNumber, pageSize) => {
    const userComments = await commentDao.getUserComments(userId, pageNumber, pageSize);
    for (let comment of userComments) {
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
    return userComments;
}