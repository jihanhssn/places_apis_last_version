const { Errorf } = require('./errors/errorf');
const logger = require('../../libs/logger');

exports.success = (res, obj = null) => {
	if (obj) {
		res.status(200).send(obj);
	} else {
		res.status(200).send();
	}
};

exports.error = (res, error) => {
	if (typeof (error) === 'object' && error instanceof Errorf) {
		logger.warn(error);
		res.status(error.status).send({
			code: error.code,
			message: error.message,
		})
	} else {
		logger.error(error);
		res.status(error.code || 500).send({
			code: error.code || 500,
			message: error.message
		});
	}
};
