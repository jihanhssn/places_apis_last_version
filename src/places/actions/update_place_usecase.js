const i18n = require('i18n');
const exceptions = require('../../commons/errors/exceptions');
const placeDao = require('../place_dao');
const placeS3Uploader = require('./place_s3_uploader');
const placeCache = require('../place_cache');
const placeLocationCache = require('../place_location_cache');

exports.updatePlace = async (placeId, updateObj, files) => {
    const place = await placeDao.getPlaceById(placeId);
    if (!place) {
        throw new exceptions.NotFoundException(i18n.__('place_not_found'));
    }

    const updatedPlace = await placeDao.updatePlace(placeId, updateObj);

    if (files.place_logo) {
        let filePath = files.place_logo[0].path;
        let fileName = files.place_logo[0].filename;
        updatedPlace.s3_id = await placeS3Uploader.uploadLogo(placeId, filePath, fileName);
        await placeDao.updatePlaceLogo(placeId, updatedPlace.s3_id);
    }

    let result = await placeDao.getFullPlaceById(placeId);

    await placeCache.addPlaceToCache(placeId, result);
    await placeLocationCache.updatePlaceLocationInCache(placeId, result.latitude, result.longitude);

    return placeCache.getPlaceFromCache(placeId);
}