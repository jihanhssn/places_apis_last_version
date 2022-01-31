const favoriteService = require('../favorite_places_service');
const resWrapper = require('../../commons/wrapper');
const logger = require('../../../libs/logger');

exports.addPlaceToFavorite = async (req, res) => {
  let placeId = req.params.place_id;
  let userId = req.user.data.user_id;

  try {
    const result = await favoriteService.addPlaceToFavorite(userId, placeId);
    resWrapper.success(res, result);
  } catch (err) {
    resWrapper.error(res, err);
    logger.error(err.message);
  }
}

exports.removePlaceFromFavorite = async (req, res) => {
  let placeId = req.params.place_id;
  let userId = req.user.data.user_id;

  try {
    const result = await favoriteService.removePlaceFromFavorite(userId, placeId);
    resWrapper.success(res, result);
  } catch (err) {
    resWrapper.error(res, err);
    logger.error(err.message);
  }
}

exports.getUserFavorite = async (req, res) => {
  const pageNumber = (req.query.page_number) ? parseInt(req.query.page_number) : 0;
  const pageSize = (req.query.page_size) ? parseInt(req.query.page_size) : 20;
  const userId = req.user.data.user_id

  try {
    const userFavorites = await favoriteService.getUserFavorite(userId, pageNumber, pageSize);
    resWrapper.success(res, userFavorites);
  } catch (err) {
    resWrapper.error(res, err);
    logger.error(err.message);
  }
}