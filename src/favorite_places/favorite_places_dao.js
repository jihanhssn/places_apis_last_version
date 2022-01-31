const db = require('../../models/index');
const favoritePlaceModel = db.place_favorites;
const placesModel = db.places;
const usersModel = db.users;

exports.getByPlaceId = async (placeId) => {
  let result = await placesModel.findOne({
    where: {
      place_id: placeId,
    }
  });
  return Promise.resolve(result === null ? null : result.toJSON());
}

exports.isFav = async (userId, placeId) => {
  let result = await favoritePlaceModel.findOne({
    where: {
      user_id: userId,
      place_id: placeId,
    }
  });

  return Promise.resolve(result === null ? null : result.toJSON());
}

exports.createFavorite = async (userId, placeId) => {
  let createdObj = await favoritePlaceModel.create({
    user_id: userId,
    place_id: placeId,
  });
  return Promise.resolve(createdObj.toJSON());
}

exports.getUserFavorite = async (userId,  pageNumber, pageSize) => {
  let offset = pageSize * pageNumber;
  let result = await favoritePlaceModel.findAll({
    where: {
      user_id: userId
    },
    include: [{
      model: placesModel,
    }],
    limit: pageSize,
    offset: offset
  });

  result = result.map(row => row.toJSON());
  return Promise.resolve(result);
}

exports.deleteFavorite = async (favoriteId) => {
  return favoritePlaceModel.destroy({
    where: {
      favorite_id: favoriteId
    }
  });
}

exports.getPlaceFavorite = async (placeId, pageSize, pageNumber) => {
  let offset = pageSize * pageNumber;
  let result = await favoritePlaceModel.findAll({
    where: {
      place_id: placeId
    },
    include: [{
      model: usersModel
    }],
    limit: pageSize,
    offset: offset
  });
  result = result.map(row => row.toJSON());
  return Promise.resolve(result);
}

exports.getAllFavoritesData = async () => {
  let result = await favoritePlaceModel.findAll({
    where: {}
  })
  result = result.map(row => row.toJSON());
  return Promise.resolve(result);
}