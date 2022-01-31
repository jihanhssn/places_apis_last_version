const express = require('express');
const router = express.Router();
const authController = require('../auth/auth_controller');
const uploader = require('../commons/upload_file_middleware');
const placeImageController = require('./place_image_controller');

router.route('/:place_id')
    .put(authController.authenticate,
        authController.isAdminOrSupervisor,
        uploader.uploadPlaceImages,
        placeImageController.addNewPlaceImages)
    .delete(authController.authenticate,
        authController.isAdminOrSupervisor,
        placeImageController.deletePlaceImages);

module.exports = router;