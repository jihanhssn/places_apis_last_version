const amenityDao = require('./places_amenities_dao');
const logger = require('../../libs/logger');
const util = require('util');
const createAmenityUseCase = require('./actions/create_amenity_usecase');
const markAmenityAsVisibleUseCase = require('./actions/mark_amenity_as_visible_usecase');
const markAmenityAsInVisibleUseCase = require('./actions/mark_amenity_as_invisible_usecase');
const refreshAmenitiesCacheUseCase = require('./actions/refresh_amenities_cache_usecase');

exports.createAmenity = async (amenity) => {
    logger.info(`createAmenity: amenity = ${amenity}`);
    return createAmenityUseCase.createAmenity(amenity)
}

exports.getAllAmenities = async () => {
    logger.info(`getAllAmenities`);
    return amenityDao.getAllAmenities();
}

exports.getAmenityDetails = async (amenityId) => {
    logger.info(`getAmenity: amenity id = ${amenityId}`);
    return amenityDao.getAmenityDetails(amenityId);
}

exports.markAmenityAsVisible = async (amenityIds) => {
    logger.info(`markAmenityAsVisible: amenityIds = ${util.inspect(amenityIds, false, null)}`);
    return markAmenityAsVisibleUseCase.markAmenityAsVisible(amenityIds);
}

exports.markAmenityAsInVisible = async (amenityIds) => {
    logger.info(`markAmenityAsInVisible: amenityIds = ${util.inspect(amenityIds, false, null)}`);
    return markAmenityAsInVisibleUseCase.markAmenityAsInVisible(amenityIds);
}

exports.getVisibleAmenities = async () => {
    logger.info(`getVisibleAmenities`);
    let visibleAmenities = await amenityDao.getVisibleAmenities();
    return visibleAmenities;
}

exports.refreshAmenitiesCache = async () => {
    logger.info(`refreshAmenitiesCache`);
    return refreshAmenitiesCacheUseCase.refreshAmenitiesCache();
}