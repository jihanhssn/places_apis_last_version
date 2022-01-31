const logger = require('../../../libs/logger');
const amenityDao = require('../places_amenities_dao');
const amenityCache = require('../place_amenities_cache');

exports.refreshAmenitiesCache = async () => {
  let visibleAmenities = await amenityDao.getVisibleAmenities();
  logger.info(`Amenities size = ${visibleAmenities.length}`);

  await amenityCache.clearAll();

  for (let i = 0; i < visibleAmenities.length; ++i) {
    let amenity = visibleAmenities[i];
    await amenityCache.addVisibleAmenitytoCache(amenity.amenity_id, amenity);
  }

  return Promise.resolve();
}