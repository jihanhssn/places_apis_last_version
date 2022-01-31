const express = require('express');
const router = express.Router();
const placeController = require('./place_controller');
const authController = require('../../auth/auth_controller');
const uploader = require('../../commons/upload_file_middleware');

router.route('/')
  .post(authController.authenticate,
    authController.isAdminOrSupervisor,
    uploader.uploadPlaceImages,
    placeController.createPlace)
  .get(authController.authenticate,
    authController.isAdminOrSupervisor,
    placeController.getAllPlaces);

router.route('/refresh_cache')
  .get(authController.authenticate,
    authController.isAdminOrSupervisor,
    placeController.refreshPlacesCache);

router.route('/:place_id')
  .put(authController.authenticate,
    authController.isAdminOrSupervisor,
    uploader.uploadPlaceImages,
    placeController.updatePlace)
  .delete(authController.authenticate,
    authController.isAdminOrSupervisor,
    placeController.deletePlace);

module.exports = router;