const i18n = require('i18n');
const s3Uploader = require('../../../libs/s3Uploader');

exports.uploadImage = async (placeId, filePath, fileName, isCommentImage) => {
  let s3;
  if (process.env.S3_UPLOAD_WITH_NO_COMPRESSION === "true") {
    s3 = await s3Uploader.uploadImageWithNoCompression(placeId, filePath, fileName, isCommentImage);
  } else {
    let result = await s3Uploader.uploadPlaceImage(placeId, filePath);
    s3 = result.s3_id;
  }

  return Promise.resolve(s3);
}

exports.uploadLogo = async (placeId, filePath, fileName) => {
  let s3;
  if (process.env.S3_UPLOAD_WITH_NO_COMPRESSION === "true") {
    s3 = await s3Uploader.uploadImageWithNoCompression(placeId, filePath, fileName, false);
  } else {
    let result = await s3Uploader.uploadPlaceLogo(placeId, filePath);
    s3 = result.s3_id;
  }

  return Promise.resolve(s3);
}
