const express = require('express');
const router = express.Router();
const recommendedController = require('./recommended_places_controller');
const authController = require('../../auth/auth_controller');

router.route('/')
    .post(authController.authenticate,
        recommendedController.getNearbyRecommendedPlaces);

router.route('/:place_id')
    .get(authController.authenticate,
        recommendedController.getRecommendedPlaceDetails);

module.exports = router;