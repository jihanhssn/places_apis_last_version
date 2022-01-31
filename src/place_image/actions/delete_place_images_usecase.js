const i18n = require('i18n');
const exceptions = require('../../commons/errors/exceptions');
const placeDao = require('../../places/place_dao');
const imageDao = require('../place_image_dao');
const placeCache = require('../../places/place_cache');

exports.deletePlaceImages = async (placeId, imagesIds) => {
    let place = await placeDao.getPlaceById(placeId);
    if (!place) {
        throw new exceptions.NotFoundException(i18n.__('place_not_found'));
    }

    for (let imagesId of imagesIds) {
        await imageDao.deletePlaceImages(imagesId, placeId);
    }
    
    place = await placeDao.getFullPlaceById(placeId);
    await placeCache.addPlaceToCache(placeId, place);
    return
}