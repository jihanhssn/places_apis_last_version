const express = require('express');
const router = express.Router();
const placeController = require('./place_controller');
const authController = require('../../auth/auth_controller');

router.route('/:place_id')
	.get(authController.authenticate, 
		placeController.getPlaceDetails);

router.route('/')
	.post(authController.authenticate, 
		placeController.getNearbyPlaces);

module.exports = router;
