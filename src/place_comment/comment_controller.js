const commentService = require('./comment_service');
const resWrapper = require('../commons/wrapper');
const logger = require('../../libs/logger');

exports.createComment = async (req, res) => {
  const userId = req.user.data.user_id;
  const comment = {
    comment: req.body.comment,
    user_id: userId,
    place_id: req.body.place_id,
    parent_comment_id: (req.body.parent_comment_id) ? parseInt(req.body.parent_comment_id) : null,
    rating: parseInt(req.body.rating)
  }

  try {
    const result = await commentService.createComment(comment, req.files);
    resWrapper.success(res, result);
  } catch (err) {
    resWrapper.error(res, err);
    logger.error(err.message);
  }
}

exports.getPlaceComments = async (req, res) => {
  const placeId = req.query.place_id;
  const userId = req.user.data.user_id;
  const pageNumber = (req.query.page_number) ? parseInt(req.query.page_number) : 0;
  const pageSize = (req.query.page_size) ? parseInt(req.query.page_size) : 20;

  try {
    const result = await commentService.getPlaceComments(placeId, userId, pageNumber, pageSize);
    resWrapper.success(res, result);
  } catch (err) {
    resWrapper.error(res, err);
    logger.error(err.message);
  }
}

exports.updateComment = async (req, res) => {
  const commentId = req.params.comment_id;
  const userId = req.user.data.user_id;
  const updateObj = {
    comment: req.body.comment,
    rating: parseInt(req.body.rating)
  }

  try {
    const comment = await commentService.updateComment(updateObj, commentId, userId, req.files);
    resWrapper.success(res, comment);
  } catch (err) {
    resWrapper.error(res, err);
    logger.error(err.message);
  }
}

exports.deleteComment = async (req, res) => {
  const commentId = req.params.comment_id;
  const userId = req.user.data.user_id;
  const placeId = req.params.place_id;

  try {
    await commentService.deleteComment(commentId, userId, placeId);
    resWrapper.success(res);
  } catch (err) {
    resWrapper.error(res, err);
    logger.error(err.message);
  }
}

exports.getUserComments = async (req, res) => {
  const pageNumber = (req.query.page_number) ? parseInt(req.query.page_number) : 0;
  const pageSize = (req.query.page_size) ? parseInt(req.query.page_size) : 20;
  const userId = req.user.data.user_id;

  try {
    const userComments = await commentService.getUserComments(userId, pageNumber, pageSize);
    resWrapper.success(res, userComments);
  } catch (err) {
    resWrapper.error(res, err);
    logger.error(err.message);
  }
}

exports.getCommentReplies = async (req, res) => {
  const parentCommentId = req.params.comment_id;
  const userId = req.user.data.user_id;
  const pageNumber = (req.query.page_number) ? parseInt(req.query.page_number) : 0;
  const pageSize = (req.query.page_size) ? parseInt(req.query.page_size) : 20;

  try {
    const commentReplies = await commentService.getCommentReplies(parentCommentId, userId, pageNumber, pageSize);
    resWrapper.success(res, commentReplies);
  } catch (err) {
    resWrapper.error(res, err);
    logger.error(err.message);
  }
}