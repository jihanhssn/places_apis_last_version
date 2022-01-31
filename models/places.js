const Sequelize = require('sequelize');
const i18n = require("i18n");
module.exports = (sequelize, DataTypes) => {
	const place = sequelize.define('places', {
		place_id: {
			type: Sequelize.STRING,
			primaryKey: true,
			allowNull: false,
		},
		// 0: lemon, 1: osm
		place_source: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		place_source_id: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: true,
		},
		name_en: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		name_ar: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		amenity_id: {
			type: Sequelize.BIGINT,
			allowNull: true,
			references: {
				model: 'amenities',
				key: 'amenity_id',
			},
			onUpdate: 'cascade',
			onDelete: 'restrict',
		},
		latitude: {
			type: Sequelize.DECIMAL(10, 8),
			allowNull: false,
		},
		longitude: {
			type: Sequelize.DECIMAL(11, 8),
			allowNull: false,
		},
		geohash_9: {
			type: Sequelize.STRING(9),
			allowNull: false,
		},
		geohash_6: {
			type: Sequelize.STRING(6),
			allowNull: false,
		},
		geohash_5: {
			type: Sequelize.STRING(5),
			allowNull: false,
		},
		user_id: {
			type: Sequelize.STRING,
			allowNull: true,
			references: {
				model: 'users',
				key: 'user_id',
			},
			onUpdate: 'cascade',
			onDelete: 'restrict',
		},
		phone: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		address: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		website: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		open: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		s3_id: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		count_rating_1: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		count_rating_2: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		count_rating_3: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		count_rating_4: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		count_rating_5: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		avg_rating: {
			type: Sequelize.DECIMAL(8, 2),
			allowNull: false,
			defaultValue: 0,
		},
		total_rating: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		comments_count: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		is_recommended:{
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		hidden: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		is_deleted: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		deleted_at: {
			type: Sequelize.DATE,
			allowNull: true
		},
		created_at: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		updated_at: {
			type: Sequelize.DATE,
			allowNull: false,
		},
	}, {});

	place.prototype.toJSON = function () {
		let values = this.get();
		values['name'] = (i18n.getLocale() === 'en') ? values['name_en'] : values['name_ar'];

		if (values.s3_id) {
			values.place_logo = process.env.S3_DOMAIN + '/' + process.env.S3_PLACES_FOLDER + '/' + values.place_id + '/' + values.s3_id + '-thumb1.png';
		} else {
			values.place_logo = null;
		}

		delete values.s3_id;

		return values;
	};

	place.associate = function (models) {

		place.belongsTo(models.amenities, {
			foreignKey: 'amenity_id',
			onDelete: 'cascade',
			foreignKeyConstraint: true
		});
		place.hasMany(models.place_images, {
			foreignKey: 'place_id',
			onDelete: 'cascade',
			foreignKeyConstraint: true
		})
	}

	return place;
}
