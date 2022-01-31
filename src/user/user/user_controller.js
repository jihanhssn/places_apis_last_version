const i18n = require('i18n');
const resWrapper = require('../../commons/wrapper');
const userService = require('../user_service');

exports.getUserById = async (req, res) => {
  let userId = req.params.user_id;
  try {
    let user = await userService.getById(userId);
    resWrapper.success(res, user);
  } catch (e) {
    resWrapper.error(res, e);
  }
};
