const i18n = require('i18n');
const resWrapper = require('../../commons/wrapper');
const userService = require('../user_service');
const logger = require('../../../libs/logger')

exports.getAllUser = async (req, res) => {
	const pageNumber = (req.query.page_number) ? parseInt(req.query.page_number) : 0;
	const pageSize = (req.query.page_size) ? parseInt(req.query.page_size) : 20;

	try {
		let users = await userService.getAllUsers(pageNumber, pageSize);
		resWrapper.success(res, users);
	} catch (e) {
		resWrapper.error(res, e);
		logger.error(e.message);
	}
};

exports.getUserById = async (req, res) => {
	let userId = req.params.user_id;
	try {
		let user = await userService.getById(userId);
		resWrapper.success(res, user);
	} catch (e) {
		resWrapper.error(res, e);
		logger.error(e.message);
	}
};