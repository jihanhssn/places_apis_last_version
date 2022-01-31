const models = require('../../models');
const imagesModel = models.place_images;

exports.addPlaceImage = async (image) => {
  let dto = {
    s3_id: image.s3_id,
    user_id: image.user_id,
    place_id: image.place_id,
  }
  let createdObj = await imagesModel.create(dto);
  return Promise.resolve(createdObj.toJSON());
}

exports.addPlaceCommentImage = async (image) => {
  let dto = {
    s3_id: image.s3_id,
    user_id: image.user_id,
    comment_id: image.comment_id,
    place_id: image.place_id
  }
  let createdObj = await imagesModel.create(dto);
  return Promise.resolve(createdObj.toJSON());
}

exports.getAllByPlaceId = async (placeId) => {
  let result = await imagesModel.findAll({
    where: {
      place_id: placeId,
      comment_id: null
    }
  });

  result = result.map(row => row.toJSON());
  return Promise.resolve(result);
}

exports.getAllByCommentId = async (commentId) => {
  let result = await imagesModel.findAll({
    where: { comment_id: commentId }
  });

  result = result.map(row => row.toJSON());
  return Promise.resolve(result);
}

exports.deletePlaceImages = async (imageId, placeId) => {
  return imagesModel.destroy({
    where: {
      id: imageId,
      place_id: placeId,
      comment_id: null
    }
  })
}

exports.deleteByPlaceId = async (placeId) => {
  return imagesModel.destroy({
    where: {
      place_id: placeId
    }
  });
}