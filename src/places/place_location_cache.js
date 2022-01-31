const redisClient = require('../../configs/redis_config').client;
const logger = require('../../libs/logger');

let PLACE_LOCATION_KEY = 'places:location';

exports.updatePlaceLocationInCache = async (placeId, latitude, longitude) => {
  await this.removeLocation(placeId);
  await this.addLocation(placeId, latitude, longitude);
}

exports.addLocation = async (placeId, latitude, longitude) => {
  return new Promise((resolve, reject) => {
    redisClient.geoadd(PLACE_LOCATION_KEY, longitude, latitude, placeId, (error, result) => {
      if (error) {
        logger.error(error);
        reject(error);
      } else {
        resolve();
      }
    })
  })
};

exports.removeLocation = async (placeId) => {
  return new Promise((resolve, reject) => {
    redisClient.zrem(PLACE_LOCATION_KEY, placeId, (error, result) => {
      if (error) {
        logger.error(error);
        reject(error);
      } else {
        resolve();
      }
    });
  })
};

exports.getNearBy = async (latitude, longitude, radius, unit) => {
  return new Promise((resolve, reject) => {
    redisClient.georadius([PLACE_LOCATION_KEY, longitude, latitude, radius, unit, 'WITHCOORD', 'WITHDIST', 'ASC'/*, 'COUNT', limit*/], (error, result) => {
      if (error) {
        logger.error(error);
        reject(error);
      } else {
        /**
         * result returned at this form:
         *[
         [
         "61426849021865611394",
         "1.4743",
         [
         "32.55857080221176147",
         "15.71431686538500827"
         ]
         ],
         [
         "61426849021865611393",
         "6.6441",
         [
         "32.53165215253829956",
         "15.64641675496863371"
         ]
         ]
         ]
         */

        logger.info(`place_location_cache getNearBy size: ${result.length}`);

        if (result.length > 0) {
          let places = [];
          for (let i = 0; i < result.length; ++i) {
            let place = {
              place_id: result[i][0],
              distance: result[i][1]
            };
            places.push(place);
          }
          resolve(places);
        } else {
          resolve([]);
        }
      }
    })
  })
}

exports.clearAll = async () => {
  return new Promise((resolve, reject) => {
    redisClient.del(PLACE_LOCATION_KEY, (error, result) => {
      if (error) {
        logger.error(error);
        reject(error);
      } else {
        resolve();
      }
    });
  })
};