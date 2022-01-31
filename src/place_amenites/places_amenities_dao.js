const db = require('../../models/index');
const amenityModel = db.amenities;

exports.createAmenity = async (amenityData) => {
    let dto = {
        amenity: amenityData
    }
    let amenity = await amenityModel.create(dto);
    return Promise.resolve(amenity.toJSON());
}

exports.findAmenity = async (amenity) => {
    let result = await amenityModel.findOne({
        where: {
            amenity: amenity
        }
    })
    return Promise.resolve(result === null ? null : result.toJSON());

}

exports.getAllAmenities = async () => {
    let result = await amenityModel.findAll();
    result = result.map(row => row.toJSON());
    return Promise.resolve(result);
}

exports.getAmenityDetails = async (amenityId) => {
    let result = await amenityModel.findOne({
        where: {
            amenity_id: amenityId,
        }
    });
    return Promise.resolve(result === null ? null : result.toJSON());
}

exports.getVisibleAmenities = async () => {
    let result = await amenityModel.findAll({
        where: { visible: true }
    });
    result = result.map(row => row.toJSON());
    return Promise.resolve(result);
}

exports.markAmenityAsVisible = async (amenityId) => {
    return amenityModel.update({
        visible: true
    }, {
        where: {
            amenity_id: amenityId
        }
    });
}

exports.markAmenityAsInVisible = async (amenityId) => {
    return amenityModel.update({
        visible: false
    }, {
        where: {
            amenity_id: amenityId
        }
    });
}