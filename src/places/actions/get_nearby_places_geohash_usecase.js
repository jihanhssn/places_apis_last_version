const geohash = require('ngeohash');
const placeDao = require('../place_dao');
const amenityService = require('../../place_amenites/amenity_service');
const favoriteDao = require('../../favorite_places/favorite_dao');
const services = require('../../commons/location_utils');

exports.getNearbyPlaces = async (userId, amenities, userLatitude, userLongitude, pageNumber, pageSize) => {
    const gh = geohash.encode(userLatitude, userLongitude);

    const gh5 = gh.substr(0, 5);
    const ns = geohash.neighbors(gh5);
    let neighborhoods = [gh5, ...ns];

    let results = [];

    const visibleAmenities = await amenityService.getVisibleAmenities();
    const amenitiesIds = visibleAmenities.map(el => el.amenity_id);

    const nearbyPlaces = await placeDao.getNearbyPlaces(neighborhoods, amenitiesIds, pageNumber, pageSize);

    for (let nearbyPlace of nearbyPlaces) {
        const fav = await favoriteDao.isFav(userId, nearbyPlace.place_id);
        nearbyPlace.is_favorite = (fav !== null);

        const placeLatitude = nearbyPlace.latitude;
        const placeLongitude = nearbyPlace.longitude;
        nearbyPlace.distance = await services.calculateDistance(userLatitude, userLongitude, placeLatitude, placeLongitude);

        if (amenities) {
            for (let amenity of amenities) {
                if (nearbyPlace.amenity.amenity === amenity) {
                    results.push(nearbyPlace);
                }
            }
        } else {
            results.push(nearbyPlace);
        }
    }

    results = results.flat();

    results.sort((a, b) => {
        return a.distance - b.distance;
    });

    return results;
}