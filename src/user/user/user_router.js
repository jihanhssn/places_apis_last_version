const express = require('express');
const router = express.Router();
const authController = require('../../auth/auth_controller');
const userController = require('./user_controller');

router.route('/:user_id')
  .get(authController.authenticate,
    userController.getUserById);

module.exports = router;
