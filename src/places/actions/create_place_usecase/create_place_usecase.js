const i18n = require('i18n');
const geohash = require('ngeohash');
const exceptions = require('../../../commons/errors/exceptions');
const pushPlaceToOSM = require('../../../integration/osm/push');
const placeDao = require('../../place_dao');
const createAmenityUseCase = require('../../../place_amenites/actions/create_amenity_usecase');
const imageDao = require('../../../place_image/place_image_dao');
const createPlaceValidator = require('./create_place_validator');
const placeS3Uploader = require('../place_s3_uploader');
const placeCache = require('../../place_cache');
const placeLocationCache = require('../../place_location_cache');
const idGenerator = require('../../../../libs/id_genenator');

exports.createPlace = async (place, user_id, files) => {
  if (!createPlaceValidator.isValidCreatePlaceReq(place)) {
    throw new exceptions.InvalidInputException();
  }
  const geohash_9 = geohash.encode(place.latitude, place.longitude);
  const geohash_6 = geohash_9.substr(0, 6);
  const geohash_5 = geohash_9.substr(0, 5);

  const contributePlace = {
    longitude: place.longitude,
    latitude: place.latitude,
    name_en: place.name_en,
    name_ar: place.name_ar,
    amenity: place.amenity,
    phone: place.phone,
    address: place.address,
    website: place.website,
    open: place.open,
  };

  place.place_source_id = null;
  place.geohash_9 = geohash_9;
  place.geohash_6 = geohash_6;
  place.geohash_5 = geohash_5;

  if (process.env.PUSH_NEW_PLACES_TO_OSM === 'true') {
    place.place_source_id = await pushPlaceToOSM(contributePlace);
  }

  if (place.amenity) {
    place.amenity_id = await createAmenityUseCase.createAmenity(place.amenity);
  }

  place.place_id = idGenerator.generateId()
  const createdPlace = await placeDao.createPlace(place);

  let placeId = createdPlace.place_id;
  let isCommentImage = false;

  if (!placeId) {
    throw new exceptions.NotFoundException(i18n.__('send_place_id'));
  }

  if (files.images) {
    for (let file of files.images) {
      let filePath = file.path;
      let fileName = file.filename;
      let s3 = await placeS3Uploader.uploadImage(placeId, filePath, fileName, isCommentImage);
      const image = {
        s3_id: s3,
        user_id: user_id,
        place_id: placeId,
      };
      await imageDao.addPlaceImage(image);
    }
  }

  if (files.place_logo) {
    let filePath = files.place_logo[0].path;
    let fileName = files.place_logo[0].filename;
    let s3_id = await placeS3Uploader.uploadLogo(placeId, filePath, fileName);
    await placeDao.updatePlaceLogo(placeId, s3_id);
  }

  let result = await placeDao.getFullPlaceById(placeId);

  await placeCache.addPlaceToCache(placeId, result);
  await placeLocationCache.updatePlaceLocationInCache(placeId, result.latitude, result.longitude);

  return placeCache.getPlaceFromCache(placeId);
}