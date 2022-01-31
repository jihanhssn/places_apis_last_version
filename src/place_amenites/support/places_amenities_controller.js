const amenityService = require('../places_amenities_service');
const resWrapper = require('../../commons/wrapper');
const logger = require('../../../libs/logger')

exports.getAllAmenities = async (req, res) => {
  try {
    const result = await amenityService.getAllAmenities();
    resWrapper.success(res, result);
  } catch (err) {
    resWrapper.error(res, err);
    logger.err(err.message);
  }
}

exports.getAmenityDetails = async (req, res) => {
  const amenityId = req.params.amenity_id;
  try {
    const result = await amenityService.getAmenityDetails(amenityId);
    resWrapper.success(res, result);
  } catch (err) {
    resWrapper.error(res, err);
    logger.err(err.message);
  }
}

exports.markAmenityAsVisible = async (req, res) => {
  try {
    const updatedAmenity = await amenityService.markAmenityAsVisible(req.body.amenityIds);
    resWrapper.success(res, updatedAmenity);
  } catch (err) {
    resWrapper.error(res, err);
    logger.err(err.message);
  }
}

exports.markAmenityAsInVisible = async (req, res) => {
  try {
    const updatedAmenity = await amenityService.markAmenityAsInVisible(req.body.amenityIds);
    resWrapper.success(res, updatedAmenity);
  } catch (err) {
    resWrapper.error(res, err);
    logger.err(err.message);
  }
}

exports.refreshAmenitiesCache = async (req, res) => {
  try {
    await amenityService.refreshAmenitiesCache();
    resWrapper.success(res,);
  } catch (err) {
    resWrapper.error(res, err);
    logger.err(err.message);
  }
}