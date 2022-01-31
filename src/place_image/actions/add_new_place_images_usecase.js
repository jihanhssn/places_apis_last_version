const i18n = require('i18n');
const exceptions = require('../../commons/errors/exceptions');
const placeDao = require('../../places/place_dao');
const imageDao = require('../place_image_dao');
const placeS3Uploader = require('../../places/actions/place_s3_uploader');
const placeCache = require('../../places/place_cache');

exports.addNewPlaceImages = async (placeId, userId, images) => {
    let cachedPlace = await placeCache.getPlaceFromCache(placeId);
    if (cachedPlace == null) {
        const place = await placeDao.getFullPlaceById(placeId);
        if (!place) {
            throw new exceptions.NotFoundException(i18n.__('place_not_found'));
        }

        await placeCache.addPlaceToCache(placeId, place);
        await placeLocationCache.updatePlaceLocationInCache(placeId, place.latitude, place.longitude);
        cachedPlace = await placeCache.getPlaceFromCache(placeId);
    }

    for (let file of images) {
        let filePath = file.path;
        let fileName = file.filename;
        let s3 = await placeS3Uploader.uploadImage(placeId, filePath, fileName, false);

        const image = {
            s3_id: s3,
            user_id: userId,
            place_id: cachedPlace.place_id,
        };
        await imageDao.addPlaceImage(image);
    }
    let result = await placeDao.getFullPlaceById(placeId);
    await placeCache.addPlaceToCache(placeId, result);
    result = await placeCache.getPlaceFromCache(placeId);
    return result;
}