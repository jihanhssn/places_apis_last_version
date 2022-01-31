const i18n = require('i18n');
const exceptions = require('../commons/errors/exceptions');
const logger = require('../../libs/logger');
const favoriteDao = require('./favorite_places_dao');

exports.addPlaceToFavorite = async (userId, placeId) => {
    logger.info(`addPlaceToFavorite: user id = ${userId}, place id = ${placeId}`);
    const place = await favoriteDao.getByPlaceId(placeId);
    if (!place) {
        throw new exceptions.NotFoundException(i18n.__('place_not_found'));
    }

    let fav = await favoriteDao.isFav(userId, placeId);
    if (!fav)
        await favoriteDao.createFavorite(userId, placeId);
}

exports.removePlaceFromFavorite = async (userId, placeId) => {
    logger.info(`removePlaceFromFavorite: user id = ${userId}, place id = ${placeId}`);
    const place = await favoriteDao.getByPlaceId(placeId);
    if (!place) {
        throw new exceptions.NotFoundException(i18n.__('place_not_found'));
    }

    let fav = await favoriteDao.isFav(userId, placeId);
    if (fav)
        await favoriteDao.deleteFavorite(fav.favorite_id);
}

exports.getUserFavorite = async (userId, pageNumber, pageSize) => {
    logger.info(`getUserFavorite: user id = ${userId}, page size  = ${pageSize}, page number = ${pageNumber}`);
    return favoriteDao.getUserFavorite(userId, pageNumber, pageSize);
}

exports.getPlaceFavorite = async (placeId, pageNumber = 0, pageSize = 20) => {
    logger.info(`getPlaceFavorite: place id = ${placeId}, page size  = ${pageSize}, page number = ${pageNumber}`);
    return favoriteDao.getPlaceFavorite(placeId, pageSize, pageNumber);
}

//Delete place usecase
exports.deleteFavorite = async (favoriteId) => {
    logger.info(`deleteFavorite: favorite id = ${favoriteId}`);
    return favoriteDao.deleteFavorite(favoriteId);
}