const express = require('express');
const router = express.Router();
const amenityController = require('./places_amenities_controller');
const authController = require('../../auth/auth_controller');

router.route('/')
  .get(authController.authenticate,
    amenityController.getVisibleAmenities)

module.exports = router;
