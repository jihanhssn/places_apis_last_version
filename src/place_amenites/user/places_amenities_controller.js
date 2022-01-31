const amenityService = require('../places_amenities_service');
const resWrapper = require('../../commons/wrapper');
const logger = require('../../../libs/logger')

exports.getVisibleAmenities = async (req, res) => {
  try {
    const visibleAmenities = await amenityService.getVisibleAmenities();
    resWrapper.success(res, visibleAmenities);
  } catch (err) {
    resWrapper.error(res, err);
    logger.error(err.message);
  }
}
