const models = require('../../../models');
const placesModel = models.places;

exports.createPlace = async (rec) => {
    let createdObj = await placesModel.create(rec);
    return Promise.resolve(createdObj.toJSON());
}

exports.updatePlace = async (rec) => {
    return placesModel.update(rec, {
        where: { place_source_id: rec.place_source_id }
    })
}

exports.findPlace = async (placeSourceId) => {
    let result = await placesModel.findOne({
        where: { place_source_id: placeSourceId }
    });
    return Promise.resolve(result === null ? null : result.toJSON());
}