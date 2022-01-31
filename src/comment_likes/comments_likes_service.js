const logger = require('../../libs/logger');
const addCommentLikeUseCase = require('./actions/add_comment_like_usecase');
const removeCommentLikeUseCase = require('./actions/remove_comment_like_usecase');
const getCommentLikesUseCase = require('./actions/get_comment_likes_usecase');

exports.getCommentLikes = async (commentId) => {
  logger.info(`getCommentLikes: comment id = ${commentId}`);
    return getCommentLikesUseCase.getCommentLikes(commentId);
}

exports.addCommentLike = async (commentId, userId) => {
    logger.info(`addCommentLike: comment id = ${commentId}, user id = ${userId}`);
    return addCommentLikeUseCase.addCommentLike(commentId, userId);
  }
  
  exports.removeCommentLike = async (commentId, userId) => {
    logger.info(`removeCommentLike: comment id = ${commentId}, user id = ${userId}`);
    return removeCommentLikeUseCase.removeCommentLike(commentId, userId);
  }