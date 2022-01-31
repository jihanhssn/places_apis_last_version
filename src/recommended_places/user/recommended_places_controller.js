const resWrapper = require('../../commons/wrapper');
const logger = require('../../../libs/logger');
const recommendedService = require('../recommended_places_service');

exports.getRecommendedPlaceDetails = async (req, res) => {
	const userId = req.user.data.user_id;
	const placeId = req.params.place_id;
	const userLatitude = req.query.latitude;
	const userLongitude = req.query.longitude;
	try {
		const result = await recommendedService.getRecommendedPlaceDetails(placeId, userId, userLatitude, userLongitude);
		resWrapper.success(res, result);
	} catch (err) {
		resWrapper.error(res, err);
		logger.error(err.message);
	}
}

exports.getNearbyRecommendedPlaces = async (req, res) => {
	const userId = req.user.data.user_id;
	const pageNumber = (req.query.page_number) ? parseInt(req.query.page_number) : 0;
	const pageSize = (req.query.page_size) ? parseInt(req.query.page_size) : 20;
	const userLatitude = req.body.latitude;
	const userLongitude = req.body.longitude;
	const amenity = (req.body.amenity === undefined || req.body.amenity === null || req.body.amenity.length === 0) ? null : req.body.amenity;

	try {
		const results = await recommendedService.getNearbyRecommendedPlaces(userId, userLatitude, userLongitude, amenity, pageNumber, pageSize);
		resWrapper.success(res, results);
	} catch (err) {
		resWrapper.error(res, err);
		logger.error(err.message);
	}
}