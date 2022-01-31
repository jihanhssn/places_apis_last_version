const util = require('util');
const logger = require('../../libs/logger');
const createPlaceUseCase = require('./actions/create_place_usecase/create_place_usecase');
const getPlaceDetailsUseCase = require('./actions/get_place_details_usecase');
const getAllPlacesUseCase = require('./actions/get_all_places_usecase');
const updatePlaceUseCase = require('./actions/update_place_usecase');
const nearbyPlacesUseCase = require('./actions/get_nearby_places_usecase');
const deletePlaceUseCase = require('./actions/delete_place_usecase');
const refreshAllPlacesCacheUseCase = require('./actions/refresh_all_places_cache');

exports.createPlace = async (place, userId, files) => {
	logger.info(`createPlace: place = ${util.inspect(place, false, null)}, user id = ${userId}, 
	files = ${util.inspect(files.images, false, null)}, place logo = ${util.inspect(files.place_logo, false, null)}`);
	return createPlaceUseCase.createPlace(place, userId, files);
}

exports.getPlaceDetails = async (placeId, userId, userLatitude, userLongitude) => {
	logger.info(`getPlaceDetails: place id = ${placeId}, user id = ${userId}, user latitude = ${userLatitude}, 
	user longitude = ${userLongitude}`);
	return getPlaceDetailsUseCase.getPlaceDetails(placeId, userId, userLatitude, userLongitude);
}

exports.getAllPlaces = async (userId, pageNumber, pageSize) => {
	logger.info(`getAllPlaces: user id = ${userId}, 
	page number = ${pageNumber}, page size = ${pageSize}`);
	return getAllPlacesUseCase.getAllPlaces(userId, pageNumber, pageSize);
}

exports.updatePlace = async (placeId, updateObj, files) => {
	logger.info(`updatePlace: place id = ${placeId}, update object = ${util.inspect(updateObj, false, null)}, 
	place logo = ${util.inspect(files.place_logo, false, null)}`);
	return updatePlaceUseCase.updatePlace(placeId, updateObj, files);
}

exports.deletePlace = async (placeId) => {
	logger.info(`deletePlace: place id = ${placeId}`);
	return deletePlaceUseCase.deletePlace(placeId);
}

exports.getNearbyPlaces = async (userId, amenity, userLatitude, userLongitude, pageNumber, pageSize) => {
	logger.info(`nearbyPlaces: user id = ${userId}, amenity = ${amenity}, page number = ${pageNumber}, page size = ${pageSize}, 
	user latitude = ${userLatitude}, user longitude = ${userLongitude}`);
	return nearbyPlacesUseCase.getNearbyPlaces(userId, amenity, userLatitude, userLongitude, pageNumber, pageSize);
}

exports.refreshPlacesCache = async () => {
	logger.info(`refreshPlacesCache`);
	return refreshAllPlacesCacheUseCase.refreshCache();
}
