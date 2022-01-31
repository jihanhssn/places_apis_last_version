const redisClient = require('../../configs/redis_config').client;
const Promise = require('bluebird');
const redis = Promise.promisifyAll(redisClient);
const i18n = require('i18n');

let PLACES_KEY = 'places';

exports.addPlaceToCache = async (placeId, place) => {
  let value = JSON.stringify(place);
  await redis.hsetAsync(PLACES_KEY, placeId, value);
}

exports.getPlaceFromCache = async (placeId) => {
  let json = await redis.hgetAsync(PLACES_KEY, placeId);
  let place = null;
  if (json) {
    place = JSON.parse(json);
  }

  if (place) {
    if (i18n.getLocale() === 'en') {
      place.name = place.name_en;
    } else {
      place.name = place.name_ar;
    }
  }
  return Promise.resolve(place);
}

exports.clearAll = async () => {
  await redis.delAsync(PLACES_KEY);
  return Promise.resolve();
};

exports.removePlaceFromCache = async (placeId) => {
  await redis.hdelAsync(PLACES_KEY, placeId);
}