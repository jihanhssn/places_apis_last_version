const express = require('express');
const router = express.Router();
const authController = require('../auth/auth_controller');
const commentLikesController = require('./comments_likes_controller');

router.route('/:comment_id')
  .get(authController.authenticate,
    commentLikesController.getCommentLikes)
  .post(authController.authenticate,
    commentLikesController.addCommentLike)
  .delete(authController.authenticate,
    commentLikesController.removeCommentLike);

module.exports = router;
