const util = require('util');
const logger = require('../../libs/logger');
const addNewPlaceImagesUseCase = require('./actions/add_new_place_images_usecase');
const deletePlaceImagesUseCase = require('./actions/delete_place_images_usecase');

exports.addNewPlaceImages = async (placeId, userId, files) => {
	logger.info(`addNewPlaceImages: place images = ${util.inspect(files.images, false, null)}`)
	return addNewPlaceImagesUseCase.addNewPlaceImages(placeId, userId, files.images);
}

exports.deletePlaceImages = async (placeId, imagesIds) => {
	logger.info(`deletePlaceImages: place id = ${placeId}, image ids = ${util.inspect(imagesIds, false, null)}`);
	return deletePlaceImagesUseCase.deletePlaceImages(placeId, imagesIds);
}