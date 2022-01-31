const placeDao = require('../place_dao');
const amenityDao = require('../../place_amenites/places_amenities_dao');
const placeCache = require('../place_cache');
const amenityCache = require('../../place_amenites/place_amenities_cache');

exports.getAllPlaces = async (userId, pageNumber, pageSize) => {
  let visibleAmenities = await amenityCache.getVisibleAmenitiesFromCache();
  if (!visibleAmenities) {
    visibleAmenities = await amenityDao.getVisibleAmenities();
    for (let i = 0; i < visibleAmenities.length; ++i) {
      let amenity = visibleAmenities[i];
      await amenityCache.addVisibleAmenitytoCache(amenity.amenity_id, amenity);
    }
  }
  const amenitiesIds = visibleAmenities.map(el => el.amenity_id);
  let places = await placeDao.getAllPlaces(pageNumber, pageSize, amenitiesIds);
  for (let i = 0; i < places.length; i++) {
    let place = places[i];
    place.is_favorite = null;
    place.distance = null;
  }

  return Promise.resolve(places);
}