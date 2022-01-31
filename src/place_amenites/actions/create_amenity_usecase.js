const amenityDao = require('../places_amenities_dao');

exports.createAmenity = async (amenity) => { 
 const existingAmenity = await amenityDao.findAmenity(amenity);
 if (existingAmenity) {
     return existingAmenity.amenity_id;
 } else {
     const createdAmenity = await amenityDao.createAmenity(amenity);
     return createdAmenity.amenity_id;
 }
}