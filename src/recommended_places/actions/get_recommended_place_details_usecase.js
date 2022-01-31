const i18n = require('i18n');
const recommendedDao = require('../recommended_places_dao');
const getPlaceDetailsUseCase = require('../../places/actions/get_place_details_usecase');
const placeCache = require('../../places/place_cache');
const exceptions = require('../../commons/errors/exceptions');

exports.getRecommendedPlaceDetails = async (placeId, userId, userLatitude, userLongitude) => {
    const recommendedPlace = await recommendedDao.getByPlaceId(placeId);
    if (!recommendedPlace) {
        throw new exceptions.NotFoundException();
    }
    let place = await getPlaceDetailsUseCase.getPlaceDetails(recommendedPlace.place_id, userId, userLatitude, userLongitude)
    return place;
}