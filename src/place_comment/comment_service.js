const util = require('util');
const logger = require('../../libs/logger');
const creatPlaceUseCase = require('./actions/create_comment_usecase');
const getPlaceCommentsUseCase = require('./actions/get_place_comments_usecase');
const updateCommentUseCase = require('./actions/update_comment_usecase');
const deleteCommentUseCase = require('./actions/delete_comment_use_case')
const getUserCommentUseCase = require('./actions/get_user_comments_usecase');
const getCommentRepliesUseCase = require('./actions/get_comment_replies_usecase');

exports.createComment = async (comment, files) => {
  logger.info(`createComment: comment = ${util.inspect(comment, false, null)}, 
  Comment images = ${util.inspect(files, false, null)}`);
  return creatPlaceUseCase.createComment(comment, files);
}

exports.getPlaceComments = async (placeId, userId, pageNumber, pageSize) => {
  logger.info(`getPlaceComments: place id = ${placeId},  user id = ${userId},  page number = ${pageNumber}, page size = ${pageSize}`);
  return getPlaceCommentsUseCase.getPlaceComments(placeId, userId, pageNumber, pageSize)
}

exports.updateComment = async (updateObj, commentId, userId, files) => {
  logger.info(`updateComment: update object = ${util.inspect(updateObj, false, null)}, comment id = ${commentId},
   user id = ${userId}, Comment images = ${util.inspect(files, false, null)}`);
  return updateCommentUseCase.updateComment(updateObj, commentId, userId, files);
}

exports.deleteComment = async (commentId, userId, placeId) => {
  logger.info(`deleteComment: comment id = ${commentId}, user id = ${userId}`);
  return deleteCommentUseCase.deleteComment(commentId, userId, placeId)
}

exports.getUserComments = async (userId, pageNumber, pageSize) => {
  logger.info(`getUserComments: user id = ${userId}, page number = ${pageNumber}, page size = ${pageSize}`);
  return getUserCommentUseCase.getUserComment(userId, pageNumber, pageSize)
}

exports.getCommentReplies = async (parentCommentId, userId, pageNumber, pageSize) => {
  logger.info(`getCommentReplies: parent comment id = ${parentCommentId}, user id = ${userId}, page number = ${pageNumber}, 
  page size = ${pageSize}`);
  return getCommentRepliesUseCase.getCommentReplies(parentCommentId, userId, pageNumber, pageSize)
}