const express = require('express');
const router = express.Router();
const favoriteController = require('./favorite_places_controller');
const authController = require('../../auth/auth_controller');

router.route('/:place_id')
	.get(authController.authenticate,
		authController.isAdminOrSupervisor,
		favoriteController.getPlaceFavorite);

module.exports = router;