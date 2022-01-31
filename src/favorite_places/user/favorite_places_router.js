const express = require('express');
const router = express.Router();
const favoriteController = require('./favorite_places_controller');
const authController = require('../../auth/auth_controller');

router.route('/:place_id')
    .post(authController.authenticate,
        favoriteController.addPlaceToFavorite)
    .delete(authController.authenticate,
        favoriteController.removePlaceFromFavorite);

router.route('/')
    .get(authController.authenticate,
        favoriteController.getUserFavorite);

module.exports = router;