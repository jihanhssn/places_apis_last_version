const express = require('express');
const router = express.Router();
const commentController = require('./comment_controller');
const authController = require('../auth/auth_controller');

router.route('/')
  .get(authController.authenticate,
    commentController.getUserComments);

module.exports = router;
