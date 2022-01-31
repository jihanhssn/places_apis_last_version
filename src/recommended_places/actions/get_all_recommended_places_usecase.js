const recommendedDao = require('../recommended_places_dao');
const placeDao = require('../../places/place_dao');
const placeCache = require('../../places/place_cache');

exports.getAllRecommendedPlaces = async (amenity, pageNumber, pageSize) => {

    const results = [];
    const recommendedPlaces = await recommendedDao.getAllRecommendedPlaces();

    for (let recommendedPlace of recommendedPlaces) {
        let place = await placeCache.getPlaceFromCache(recommendedPlace.place_id);
        if (!place) {
            place = await placeDao.getFullPlaceById(recommendedPlace.place_id);
            if (place !== null) {
                await placeCache.addPlaceToCache(recommendedPlace.place_id, place);
            } else {
                continue
            }
        }

        recommendedPlace = place;

        if (amenity) {
            if (amenity.includes(recommendedPlace.amenity.amenity)) {
                results.push(recommendedPlace);
            }
        } else {
            results.push(recommendedPlace)
        }
    }
    
    if (pageNumber !== null && pageSize !== null) {
        results = results.slice(pageNumber * pageSize, pageNumber * pageSize + pageSize);
    }
    return results;
}