const amenityDao = require('../places_amenities_dao');
const amenityCache = require('../place_amenities_cache');

exports.markAmenityAsInVisible = async (amenityIds) =>{
 for (let amenityId of amenityIds) {
    const amen = await amenityDao.getAmenityDetails(amenityId);
    if (!amen) {
        continue;
    }
    await amenityDao.markAmenityAsInVisible(amenityId);
    await amenityCache.removeVisibleAmenityFromCache(amenityId);
}
return;
}