const commentsLikesService = require('./comments_likes_service');
const resWrapper = require('../commons/wrapper');
const logger = require('../../libs/logger');

exports.getCommentLikes = async (req, res) => {
  const commentId = req.params.comment_id;

  try {
    const result = await commentsLikesService.getCommentLikes(commentId);
    resWrapper.success(res, result);
  } catch (err) {
    resWrapper.error(res, err);
    logger.error(err.message);
  }
}

exports.addCommentLike = async (req, res) => {
    const commentId = req.params.comment_id;
    const userId = req.user.data.user_id;
  
    try {
      const result = await commentsLikesService.addCommentLike(commentId, userId);
      resWrapper.success(res, result);
    } catch (err) {
      resWrapper.error(res, err);
      logger.error(err.message);
    }
  }
  
  exports.removeCommentLike = async (req, res) => {
    const commentId = req.params.comment_id;
    const userId = req.user.data.user_id;
  
    try {
      const result = await commentsLikesService.removeCommentLike(commentId, userId);
      resWrapper.success(res, result);
    } catch (err) {
      resWrapper.error(res, err);
      logger.error(err.message);
    }
  }