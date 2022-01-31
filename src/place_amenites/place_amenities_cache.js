const redisClient = require('../../configs/redis_config').client;
const Promise = require('bluebird');
const redis = Promise.promisifyAll(redisClient);

let AMENITIES_KEY = 'amenities';

exports.addVisibleAmenitytoCache = async (amenityId, amenityData) => {
  let value = JSON.stringify(amenityData);
  await redis.hset(AMENITIES_KEY, amenityId, value);
}

exports.getVisibleAmenitiesFromCache = async () => {
  let json = await redis.hgetallAsync(AMENITIES_KEY);
  let amenities = []

  if (json) {
    let parsedJsons = Object.values(json);
    for (let parsedJson of parsedJsons) {
      let amenity = JSON.parse(parsedJson);
      amenities.push(amenity);
    }
  }
  return Promise.resolve(amenities);
}

exports.clearAll = async () => {
  await redis.delAsync(AMENITIES_KEY);
  return Promise.resolve();
};

exports.removeVisibleAmenityFromCache = async (amenityId) => {
  await redis.hdel(AMENITIES_KEY, amenityId);
}