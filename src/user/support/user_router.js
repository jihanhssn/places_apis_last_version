const express = require('express');
const router = express.Router();
const authController = require('../../auth/auth_controller');
const userController = require('./user_controller');

router.route('/')
  .get(authController.authenticate,
    authController.isAdminOrSupervisor,
    userController.getAllUser);

router.route('/:user_id')
  .get(authController.authenticate,
    authController.isAdminOrSupervisor,
    userController.getUserById);

module.exports = router;