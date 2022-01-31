const multer = require('multer');
const logger = require('./../../libs/logger');
const crypto = require("crypto");
const fs = require('fs');
const Errors = require('../commons/errors/exceptions');
const errorsHandler = require('./wrapper');

exports.uploadPlaceImages = function (req, res, next) {

	let path = process.env.FILE_STORAGE_PATH;

	// create dir if not exist
	fs.existsSync(path) || fs.mkdirSync(path);

	let storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, path)
		},
		filename: function (req, file, cb) {
			getCryptoName(function (name) {
				cb(null, name + '.png');
			})
		}
	});

	let upload = multer({storage: storage}).fields([
		{ name: "images" },
		{ name: "place_logo" }
	]);

	upload(req, res, function (err) {
		if (err) {
			errorsHandler.error(res, err);
			return;
		}

		next();
	});
};

exports.uploadCommentImages = function (req, res, next) {
	let path = process.env.FILE_STORAGE_PATH;

	// create dir if not exist
	fs.existsSync(path) || fs.mkdirSync(path);

	let storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, path)
		},
		filename: function (req, file, cb) {
			getCryptoName(function (name) {
				cb(null, name + '.png');
			})
		}
	});

	let upload = multer({storage: storage}).array('images');

	upload(req, res, function (err) {
		if (err) {
			errorsHandler.error(res, err);
			return;
		}

		next();
	});
};

const getCryptoName = function (callback) {
	crypto.pseudoRandomBytes(16, function (err, raw) {
		callback(raw.toString('hex') + Date.now());
	});
};