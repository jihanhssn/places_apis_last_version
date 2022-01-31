const resWrapper = require('../../commons/wrapper');
const placeService = require('../place_service');
const logger = require('../../../libs/logger');

exports.getPlaceDetails = async (req, res) => {
	const placeId = req.params.place_id;
	const userId = req.user.data.user_id;
	const userLatitude = req.query.latitude;
	const userLongitude = req.query.longitude;

	try {
		const result = await placeService.getPlaceDetails(placeId, userId, userLatitude, userLongitude);
		resWrapper.success(res, result);
	} catch (err) {
		resWrapper.error(res, err);
		logger.error(err.message);
	}
}

exports.getNearbyPlaces = async (req, res) => {
	const userId = req.user.data.user_id;
	const pageNumber = (req.query.page_number) ? parseInt(req.query.page_number) : 0;
	const pageSize = (req.query.page_size) ? parseInt(req.query.page_size) : 20;
	const nearby = {
		amenity: (req.body.amenity === undefined || req.body.amenity.length === 0) ? null : req.body.amenity,
		latitude: req.body.latitude,
		longitude: req.body.longitude,
	}
	const userLatitude = nearby.latitude;
	const userLongitude = nearby.longitude;

	try {
		const results = await placeService.getNearbyPlaces(userId, nearby.amenity, userLatitude, userLongitude, pageNumber, pageSize);
		resWrapper.success(res, results);
	} catch (err) {
		resWrapper.error(res, err);
		logger.error(err.message);
	}
}