const util = require('util');
const logger = require('../../libs/logger');
const recommendedDao = require('./recommended_places_dao');
const addRecommendedPlaceUseCase = require('./actions/create_recommended_place_usecase');
const getRecommendedPlaceDetailsUseCase = require('./actions/get_recommended_place_details_usecase');
const getAllRecommendedPlacesUseCase = require('./actions/get_all_recommended_places_usecase');
const getNearbyRecommendedPlacesUseCase = require('./actions/get_nearby_recommended_places_usecase');

exports.addRecommendedPlace = async (placeId) => {
  logger.info(`addRecommendedPlace: place id = ${placeId}`);
  return addRecommendedPlaceUseCase.addRecommendedPlace(placeId);
}

exports.getRecommendedPlaceDetails = async (placeId, userId, userLatitude, userLongitude) => {
  logger.info(`getRecommendedPlace: place id = ${placeId},
   user id = ${userId}, user latitude = ${userLatitude}, user longitude = ${userLongitude}`);
  return getRecommendedPlaceDetailsUseCase.getRecommendedPlaceDetails(placeId, userId, userLatitude, userLongitude)
}

exports.getAllRecommendedPlaces = async (amenity, pageNumber, pageSize) => {
  logger.info(`getAllRecommendedPlaces: amenity = ${util.inspect(amenity, false, null)}, page number = ${pageNumber}, page size = ${pageSize}`);
  return getAllRecommendedPlacesUseCase.getAllRecommendedPlaces(userId, amenity, pageNumber, pageSize);
}

exports.getNearbyRecommendedPlaces = async (userId, userLatitude, userLongitude, amenity, pageNumber, pageSize) => {
  logger.info(`getNearbyRecommendedPlaces: user id = ${userId}, user latitude = ${userLatitude}, user longitude = ${userLongitude}, 
  amenity = ${util.inspect(amenity, false, null)}, page number = ${pageNumber}, page size = ${pageSize}`);
  return getNearbyRecommendedPlacesUseCase.getNearbyRecommendedPlaces(userId, userLatitude, userLongitude, amenity, pageNumber, pageSize);
};


exports.deleteRecommendedPlace = async (placeId) => {
  logger.info(`deleteRecommendedPlace: place id = ${placeId}`);
  return recommendedDao.deleteRecommendedPlace(placeId);
}