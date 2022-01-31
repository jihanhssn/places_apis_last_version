const models = require('../../models');
const recommendedModel = models.recommended_places;
const placesModel = models.places;

exports.addRecommendedPlace = async (placeId) => {
  return placesModel.update({
    is_recommended: true
  }, {
    where: {
      place_id: placeId
    }
  });
}

exports.getByPlaceId = async (placeId) => {
  let result = await placesModel.findOne({
    where: {
      place_id: placeId,
      is_recommended: true
    }
  });

  return Promise.resolve(result === null ? null : result.toJSON());
}

exports.getAllRecommendedPlaces = async () => {
  let result = await placesModel.findAll({
    where: {
      is_recommended: true
    }
  });

  result = result.map(row => row.toJSON());
  return Promise.resolve(result);
}

exports.deleteRecommendedPlace = async (placeId) => {
  return placesModel.update({
    is_recommended: false
  }, {
    where: {
      place_id: placeId
    }
  });
}