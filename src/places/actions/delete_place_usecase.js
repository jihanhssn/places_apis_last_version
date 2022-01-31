const i18n = require('i18n');
const exceptions = require('../../commons/errors/exceptions');
const placeDao = require('../place_dao');
const placeCache = require('../place_cache');

exports.deletePlace = async (placeId) => {
    const place = await placeDao.getPlaceById(placeId);
    if (!place) {
        throw new exceptions.NotFoundException(i18n.__('place_not_found'));
    }

    // let favs = await favoriteService.getPlaceFavorite(placeId);
    // for (let fav of favs) {
    //     await favoriteService.deleteFavorite(fav.favorite_id);
    // }

    // await commentDao.markCommentAsDeletedByPlaceId(placeId);
    // await imageDao.deleteByPlaceId(placeId);

    await placeDao.markPlaceAsDeleted(placeId);
    await placeCache.removePlaceFromCache(placeId);
    return 
}