const i18n = require('i18n');
const exceptions = require('../../commons/errors/exceptions');
const placeDao = require('../place_dao');
const favoriteDao = require('../../favorite_places/favorite_places_dao');
const amenityCache = require('../../place_amenites/place_amenities_cache');
const services = require('../../commons/location_utils');
const placeCache = require('../place_cache');
const placeLocationCache = require('../place_location_cache');

exports.getPlaceDetails = async (placeId, userId, userLatitude, userLongitude) => {
  const favoritePlaces = await favoriteDao.getUserFavorite(userId, 0, 1000);
  let favSet = [];
  for (let fav of favoritePlaces) {
    favSet.push(fav.place_id);
  }

  const visibleAmenities = await amenityCache.getVisibleAmenitiesFromCache();
  const amenitiesIds = visibleAmenities.map(el => el.amenity_id);

  let cachedPlace = await placeCache.getPlaceFromCache(placeId);
  if (cachedPlace == null) {
    const place = await placeDao.getFullPlaceById(placeId);
    if (!place) {
      throw new exceptions.NotFoundException(i18n.__('place_not_found'));
    }

    // Add place to cache
    await placeCache.addPlaceToCache(placeId, place);
    await placeLocationCache.updatePlaceLocationInCache(placeId, place.latitude, place.longitude);
    cachedPlace = await placeCache.getPlaceFromCache(placeId);
  }

  if (!amenitiesIds.includes(cachedPlace.amenity_id)) {
    throw new exceptions.NotFoundException(i18n.__('place_not_found'));
  }

  const fav = favSet.includes(cachedPlace.place_id)
  cachedPlace.is_favorite = (fav !== false);

  const placeLatitude = cachedPlace.latitude;
  const placeLongitude = cachedPlace.longitude;

  cachedPlace.distance = await services.calculateDistance(
    userLatitude, userLongitude, placeLatitude, placeLongitude);

  return cachedPlace;
};