const recommendedDao = require('../recommended_places_dao');
const placeDao = require('../../places/place_dao');
const amenityDao = require('../../place_amenites/places_amenities_dao');
const favoriteDao = require('../../favorite_places/favorite_places_dao');
const placeCache = require('../../places/place_cache');
const amenityCache = require('../../place_amenites/place_amenities_cache');
const placeLocation = require('../../places/place_location_cache');
const logger = require('../../../libs/logger');

exports.getNearbyRecommendedPlaces = async (userId, userLatitude, userLongitude, amenity, pageNumber, pageSize) => {
    const userFavoritePlaces = await favoriteDao.getUserFavorite(userId, 0, 1000);
    let favSet = [];
    for (let fav of userFavoritePlaces) {
        favSet.push(fav.place_id);
    }

    let visibleAmenities = await amenityCache.getVisibleAmenitiesFromCache();
    if (!visibleAmenities) {
        visibleAmenities = await amenityDao.getVisibleAmenities();
        for (let i = 0; i < visibleAmenities.length; ++i) {
            let amenity = visibleAmenities[i];
            await amenityCache.addVisibleAmenitytoCache(amenity.amenity_id, amenity);
        }
    }
    const amenitiesIds = visibleAmenities.map(el => el.amenity_id);

    let results = [];
    let radius = 5;
    let unit = 'km';

    const recommendedPlaces = await recommendedDao.getAllRecommendedPlaces();
    logger.info(`Initial Recommended Places Length is: ${recommendedPlaces.length}`);
    const nearbyPlaces = await placeLocation.getNearBy(userLatitude, userLongitude, radius, unit);

    for (let recommendedPlace of recommendedPlaces) {
        let place = await placeCache.getPlaceFromCache(recommendedPlace.place_id);
        if (!place) {
            place = await placeDao.getFullPlaceById(recommendedPlace.place_id);
            if (place !== null) {
                await placeCache.addPlaceToCache(recommendedPlace.place_id, place);
            } else {
                continue;
            }
        }
        recommendedPlace = place;

        const fav = favSet.includes(place.place_id);
        place.is_favorite = (fav !== false);

        if (amenity) {
            if (amenity.includes(recommendedPlace.amenity.amenity)) {
                if (amenitiesIds.includes(recommendedPlace.amenity_id)) {
                    results.push(recommendedPlace);
                }
            }
        } else {
            if (amenitiesIds.includes(recommendedPlace.amenity_id))
                results.push(recommendedPlace);
            else {
                continue;
            }
        }
    }

    let result = [];
    let nearbyPlacesLength = 5;

    for (let nearbyPlace of nearbyPlaces) {
        for (let place of results) {
            if (place.place_id == nearbyPlace.place_id) {
                place.distance = nearbyPlace.distance;
                result.push(place);
            }
        }
    }

    if (pageNumber !== null && pageSize !== null) {
        result = result.slice(pageNumber * pageSize, pageNumber * pageSize + pageSize);
    } else {
        result = result.slice(0, nearbyPlacesLength);
    }

    logger.info(`Final recommended places length is: ${result.length}`);
    return result;
}