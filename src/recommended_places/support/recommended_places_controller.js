const resWrapper = require('../../commons/wrapper');
const logger = require('../../../libs/logger');
const recommendedService = require('../recommended_places_service');

exports.addRecommendedPlace = async (req, res) => {
  const placeId = req.params.place_id;
  try {
    const result = await recommendedService.addRecommendedPlace(placeId);
    resWrapper.success(res, result);
  } catch (err) {
    resWrapper.error(res, err);
    logger.error(err.message);
  }
}

exports.deleteRecommendedPlace = async (req, res) => {
  const placeId = req.params.place_id;

  try {
    await recommendedService.deleteRecommendedPlace(placeId);
    resWrapper.success(res);
  } catch (err) {
    resWrapper.error(res, err);
    logger.error(err.message);
  }
}

exports.getAllRecommendedPlaces = async (req, res) => {
  const userId = req.user.data.user_id;
  const pageNumber = (req.query.page_number) ? parseInt(req.query.page_number) : 0;
  const pageSize = (req.query.page_size) ? parseInt(req.query.page_size) : 20;
  const amenity = (req.body.amenity === undefined || req.body.amenity.length === 0) ? null : req.body.amenity;

  try {
    const results = await recommendedService.getAllRecommendedPlaces(userLatitude, userLongitude, amenity, pageNumber, pageSize);
    resWrapper.success(res, results);
  } catch (err) {
    resWrapper.error(res, err);
    logger.error(err.message);
  }
}