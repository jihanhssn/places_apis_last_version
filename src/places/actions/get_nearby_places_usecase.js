const placeDao = require('../place_dao');
const favoriteDao = require('../../favorite_places/favorite_places_dao');
const amenityDao = require('../../place_amenites/places_amenities_dao');
const placeLocationCache = require('../place_location_cache');
const placeCache = require('../place_cache');
const amenityCache = require('../../place_amenites/place_amenities_cache');
const logger = require('../../../libs/logger.js');

exports.getNearbyPlaces = async (userId, amenities, userLatitude, userLongitude, pageNumber, pageSize) => {
  let results = [];
  let radius = 5;
  let unit = 'km';

  const userFavoritePlaces = await favoriteDao.getUserFavorite(userId, 0, 1000);
  let favSet = [];
  for (let fav of userFavoritePlaces) {
    favSet.push(fav.place_id);
  }

  let visibleAmenities = await amenityCache.getVisibleAmenitiesFromCache();
  if (visibleAmenities.length === 0) {
    visibleAmenities = await amenityDao.getVisibleAmenities();
    for (let i = 0; i < visibleAmenities.length; ++i) {
      let amenity = visibleAmenities[i];
      await amenityCache.addVisibleAmenitytoCache(amenity.amenity_id, amenity);
    }
  }
  const amenitiesIds = visibleAmenities.map(el => el.amenity_id);

  const placeLocations = await placeLocationCache.getNearBy(userLatitude, userLongitude, radius, unit);
  logger.info(`Redis nearby results size: ${placeLocations.length}`);

  for (let i = 0; i < placeLocations.length; i++) {
    let placeLocation = placeLocations[i];
    let placeId = placeLocation.place_id;
    let distance = placeLocation.distance;

    // logger.info(`placeLocation: ${JSON.stringify(placeLocation)}`);

    let place = await placeCache.getPlaceFromCache(placeId);
    if (!place) {
      place = await placeDao.getFullPlaceById(placeId);
      if (place !== null) {
        await placeCache.addPlaceToCache(placeId, place);
      } else {
        continue
      }
    }

    place.distance = distance;

    const fav = favSet.includes(place.place_id);
    place.is_favorite = (fav !== false);

    if (amenities) {
      if (amenities.includes(place.amenity.amenity)) {
        results.push(place);
      }
    } else {
      if (amenitiesIds.includes(place.amenity_id)) {
        results.push(place);
      }
    }
  }
  logger.info(`Filtered nearby results size: ${results.length}`);

  if (pageNumber !== null && pageSize !== null) {
    results = results.slice(pageNumber * pageSize, pageNumber * pageSize + pageSize);
  }
  return results;
}