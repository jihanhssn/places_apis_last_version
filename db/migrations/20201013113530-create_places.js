'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		queryInterface.createTable("places", {
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
			latitude: {
				type: Sequelize.DECIMAL(10, 8),
				allowNull: false,
			},
			longitude: {
				type: Sequelize.DECIMAL(11, 8),
				allowNull: false,
			},
			amenity_id:{
				type:Sequelize.BIGINT,
				allowNull:true,
				references:{
				  model:'amenities',
				  key: 'amenity_id',
					  },
					  onUpdate: 'cascade',
					  onDelete: 'restrict',
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
			is_deleted: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			hidden: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			deleted_at: {
				type: Sequelize.DATE,
				allowNull: true
			}
		});
	},

	down: async (queryInterface, Sequelize) => {
		queryInterface.dropTable("places");
	}
};
