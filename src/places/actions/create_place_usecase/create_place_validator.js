
const util = require('util');
const validator = require('validator');
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const logger = require('../../../../libs/logger');

exports.isValidCreatePlaceReq = (createReq) => {
    logger.info(`isValidCreatePlaceReq: ${util.inspect(createReq, false, null)}`);

    if (createReq.latitude == null || validator.isEmpty(createReq.latitude + '')) {
        return false;
    }

    if (createReq.longitude == null || validator.isEmpty(createReq.longitude + '')) {
        return false;
    }


    let phone = createReq.phone;
    if (phone) {
        try {
            let mobileObj = phoneUtil.parse(phone);
            if (!phoneUtil.isValidNumber(mobileObj)) {
                return false;
            }
        } catch (error) {
            logger.error(`isValidCreatePlaceReq Invalid Mobile: ${phone}`);
            return false;
        }
    }
    return true;
};