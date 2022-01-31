const express = require('express');
const router = express.Router();
const amenityController = require('./places_amenities_controller');
const authController = require('../../auth/auth_controller');

router.route('/')
    .get(authController.authenticate,
        authController.isAdminOrSupervisor,
        amenityController.getAllAmenities);

router.route('/:amenity_id')
    .get(authController.authenticate,
        authController.isAdminOrSupervisor,
        amenityController.getAmenityDetails);

router.route('/visible')
    .put(authController.authenticate,
        authController.isAdminOrSupervisor,
        amenityController.markAmenityAsVisible);

router.route('/invisible')
    .put(authController.authenticate,
        authController.isAdminOrSupervisor,
        amenityController.markAmenityAsInVisible);

router.route('/refresh_cache')
    .put(authController.authenticate,
        authController.isAdminOrSupervisor,
        amenityController.refreshAmenitiesCache);

module.exports = router;