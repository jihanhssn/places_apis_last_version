const resWrapper = require('../../commons/wrapper');
const logger = require('../../../libs/logger');
const placeService = require('../place_service');

exports.createPlace = async (req, res) => {
  const user_id = req.user.data.user_id;
  const name_en = req.body.name_en;
  const name_ar = req.body.name_ar;
  const amenity = req.body.amenity;
  const latitude = parseFloat(req.body.latitude);
  const longitude = parseFloat(req.body.longitude);
  const phone = req.body.phone;
  const address = req.body.address;
  const website = req.body.website;
  const open = req.body.open;

  const place = {
    place_source: 0,
    name_en: name_en,
    name_ar: name_ar,
    amenity: amenity,
    latitude: latitude,
    longitude: longitude,
    user_id: user_id,
    phone: phone,
    address: address,
    website: website,
    open: open,
  };

  try {
    const result = await placeService.createPlace(place, user_id, req.files);
    resWrapper.success(res, result);
  } catch (err) {
    resWrapper.error(res, err);
    logger.error(err.message);
  }
}

exports.getAllPlaces = async (req, res) => {
  const pageNumber = (req.query.page_number) ? parseInt(req.query.page_number) : 0;
  const pageSize = (req.query.page_size) ? parseInt(req.query.page_size) : 20;
  const userID = req.user.data.user_id;

  try {
    const results = await placeService.getAllPlaces(userID, pageNumber, pageSize);
    resWrapper.success(res, results);
  } catch (err) {
    resWrapper.error(res, err);
    logger.error(err.message);
  }
}

exports.updatePlace = async (req, res) => {
  const updateObj = {
    name_en: req.body.name_en,
    name_ar: req.body.name_ar,
    amenity: req.body.amenity,
    phone: req.body.phone,
    address: req.body.address,
    website: req.body.website,
    open: req.body.open
  };
  const placeId = req.params.place_id;

  try {
    const result = await placeService.updatePlace(placeId, updateObj, req.files);
    resWrapper.success(res, result);
  } catch (err) {
    resWrapper.error(res, err);
    logger.error(err.message);
  }
}

exports.deletePlace = async (req, res) => {
  const placeId = req.params.place_id;

  try {
    await placeService.deletePlace(placeId);
    resWrapper.success(res);
  } catch (err) {
    resWrapper.error(res, err);
    logger.error(err.message);
  }
}

exports.refreshPlacesCache = async (req, res) => {
  try {
    await placeService.refreshPlacesCache();
    resWrapper.success(res);
  } catch (err) {
    resWrapper.error(res, err);
    logger.error(err.message);
  }
}