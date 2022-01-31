const express = require('express');
const router = express.Router();
const commentController = require('./comment_controller');
const authController = require('../auth/auth_controller');
const uploader = require('../commons/upload_file_middleware');

router.route('/')
  .post(authController.authenticate,
    uploader.uploadCommentImages,
    commentController.createComment);

router.route('/')
  .get(authController.authenticate,
    commentController.getPlaceComments);

router.route('/:comment_id')
  .get(authController.authenticate,
    commentController.getCommentReplies)
  .put(authController.authenticate,
    uploader.uploadCommentImages,
    commentController.updateComment)
  .delete(authController.authenticate,
    commentController.deleteComment);

module.exports = router;