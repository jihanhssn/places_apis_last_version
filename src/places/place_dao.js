const { Op } = require("sequelize");
const models = require('../../models');
const placesModel = models.places;
const amenityModel = models.amenities;
const imageModel = models.place_images;

const placeInclude = [{
	model: amenityModel
}, {
	model: imageModel,
}];

exports.createPlace = async (place) => {
	console.log(place.place_id)
	let dto = {
		place_id: place.place_id,
		user_id: place.user_id,
		place_source_id: place.place_source_id,
		place_source: place.place_source,
		name_en: place.name_en,
		name_ar: place.name_ar,
		amenity_id: place.amenity_id,
		latitude: place.latitude,
		longitude: place.longitude,
		phone: place.phone,
		address: place.address,
		website: place.website,
		open: place.open,
		geohash_9: place.geohash_9,
		geohash_6: place.geohash_6,
		geohash_5: place.geohash_5
	}
	let createdObj = await placesModel.create(dto);
	return Promise.resolve(createdObj.toJSON());
}

exports.getPlaceById = async (placeId) => {
	let result = await placesModel.findOne({
		where: {
			place_id: placeId,
			is_deleted: false,
		}
	});

	return Promise.resolve(result === null ? null : result.toJSON());
}

exports.getFullPlaceById = async (placeId) => {
	let result = await placesModel.findOne({
		where: {
			place_id: placeId,
			is_deleted: false,
		},
		include: placeInclude,
	});

	return Promise.resolve(result === null ? null : result.toJSON());
}

exports.getAllPlaces = async (pageNumber, pageSize, amenitiesIds) => {
	let offset = pageNumber * pageSize;
	let order = [["created_at", "DESC"]];
	let where = {
		is_deleted: false,
	}

	if (amenitiesIds) {
		where.amenity_id = amenitiesIds;
	}

	let result = await placesModel.findAll({
		where: where,
		order: order,
		include: placeInclude,
		offset: offset,
		limit: pageSize,
		raw: false
	});

	result = result.map(row => row.toJSON());
	return Promise.resolve(result);
}

exports.getNearbyPlaces = async (neighborhoods, amenitiesIds, pageNumber, pageSize) => {
	let offset = pageNumber * pageSize;
	let result = await placesModel.findAll({
		where: {
			is_deleted: false,
			amenity_id: amenitiesIds,
			geohash_5: neighborhoods
		},
		include: placeInclude,
		offset: offset,
		limit: pageSize,
		raw: false
	});
	result = result.map(row => row.toJSON());
	return Promise.resolve(result);
}

exports.updatePlace = async (placeId, updateObj) => {
	let dto = {
		name_en: updateObj.name_en,
		name_ar: updateObj.name_ar,
		phone: updateObj.phone,
		address: updateObj.address,
		website: updateObj.website,
		open: updateObj.open
	}
	return placesModel.update(dto, {
		where: {
			place_id: placeId
		}
	});
}

exports.updatePlaceObjectBasedOnCommentsUpdates = async (placeId, place) => {
	let dto = {
		count_rating_1: place.count_rating_1,
		count_rating_2: place.count_rating_2,
		count_rating_3: place.count_rating_3,
		count_rating_4: place.count_rating_4,
		count_rating_5: place.count_rating_5,
		total_rating: place.total_rating,
		avg_rating: place.avg_rating,
		comments_count: place.comments_count
	}
	return placesModel.update(dto, {
		where: {
			place_id: placeId
		}
	})
}

exports.updatePlaceLogo = async (placeId, s3Id) => {
	return placesModel.update({
		s3_id: s3Id
	}, {
		where: {
			place_id: placeId
		}
	});
}

exports.markPlaceAsDeleted = async (placeId) => {
	return placesModel.update({
		is_deleted: true,
		deleted_at: new Date(),
	},
		{
			where: {
				place_id: placeId
			}
		}
	)
}

// exports.markPlaceAsHidden = async (amenityId) => {
// 	return placesModel.update({
// 		hidden: true,
// 	},
// 		{
// 			where: {
// 				amenity_id: amenityId
// 			}
// 		}
// 	)
// }

// exports.removeHiddenMark = async (amenityId) => {
// 	return placesModel.update({
// 		hidden: false,
// 	},
// 		{
// 			where: {
// 				amenity_id: amenityId
// 			}
// 		}
// 	)
// }