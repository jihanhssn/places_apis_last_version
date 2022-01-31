const i18n = require('i18n');
const recommendedDao = require('../recommended_places_dao');
const placeDao = require('../../places/place_dao');
const placeCache = require('../../places/place_cache');
const exceptions = require('../../commons/errors/exceptions');

exports.addRecommendedPlace = async (placeId) => {
    const place = await placeDao.getPlaceById(placeId);
    if (!place) {
        throw new exceptions.NotFoundException(i18n.__('place_not_found'));
    }

    const existingRecommendedPlace = await recommendedDao.getByPlaceId(placeId);
    if (existingRecommendedPlace) {
        throw new exceptions.InvalidInputException(i18n.__('recommended_already_exist'));
    }

    await recommendedDao.addRecommendedPlace(placeId);
    let result = await placeDao.getFullPlaceById(placeId);
    await placeCache.addPlaceToCache(placeId, result);
    return result;
}