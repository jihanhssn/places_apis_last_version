const resWrapper = require('../commons/wrapper');
const logger = require('../../libs/logger');
const placeImageService = require('./place_image_service');

exports.addNewPlaceImages = async (req, res) => {
    const placeId = req.params.place_id;
    const userId = req.user.data.user_id;
  
    try {
      const result = await placeImageService.addNewPlaceImages(placeId, userId, req.files);
      resWrapper.success(res, result);
    } catch (err) {
      resWrapper.error(res, err);
      logger.error(err.message);
    }
  }

  exports.deletePlaceImages = async (req, res) => {
    const placeId = req.params.place_id;
    const imagesIds = req.body.imagesIds
  
    try {
      await placeImageService.deletePlaceImages(placeId, imagesIds);
      resWrapper.success(res);
    } catch (err) {
      resWrapper.error(res, err);
      logger.error(err.message);
    }
  }