const logger = require('../../../libs/logger');
const placeDao = require('../place_dao');
const placeCache = require('../place_cache');
const placeLocationCache = require('../place_location_cache');

exports.refreshCache = async () => {
  let places = await placeDao.getAllPlaces(0, 1000000);
  logger.info(`Places size = ${places.length}`);

  await placeCache.clearAll();
  await placeLocationCache.clearAll();

  for (let i = 0; i < places.length; ++i) {
    let place = places[i];
    await placeCache.addPlaceToCache(place.place_id, place);
    await placeLocationCache.updatePlaceLocationInCache(place.place_id, place.latitude, place.longitude);
  }

  return Promise.resolve();
}