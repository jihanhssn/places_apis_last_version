const express = require('express');
const router = express.Router();
const recommendedController = require('./recommended_places_controller');
const authController = require('../../auth/auth_controller');

router.route('/')
    .post(authController.authenticate,
        authController.isAdminOrSupervisor,
        recommendedController.getAllRecommendedPlaces);

router.route('/:place_id')
    .delete(authController.authenticate,
        authController.isAdminOrSupervisor,
        recommendedController.deleteRecommendedPlace)
    .post(authController.authenticate,
        authController.isAdminOrSupervisor,
        recommendedController.addRecommendedPlace);

module.exports = router;