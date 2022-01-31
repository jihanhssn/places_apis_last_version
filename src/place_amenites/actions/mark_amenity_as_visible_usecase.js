const amenityDao = require('../places_amenities_dao');
const amenityCache = require('../place_amenities_cache');

exports.markAmenityAsVisible = async (amenityIds) => {
    for (let amenityId of amenityIds) {
        const amenity = await amenityDao.getAmenityDetails(amenityId);
        if (!amenity) {
            continue;
        }
        await amenityDao.markAmenityAsVisible(amenityId);
        await amenityCache.addVisibleAmenitytoCache(amenityId, amenity);
    }
    return 
}