'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		queryInterface.createTable("place_images", {
			image_id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			s3_id: {
				type: Sequelize.STRING,
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
			place_id: {
				type: Sequelize.STRING,
				allowNull: true,
				references: {
					model: 'places',
					key: 'place_id',
				},
				onUpdate: 'cascade',
				onDelete: 'restrict',
			},
			comment_id: {
				type: Sequelize.BIGINT,
				allowNull: true,
				references: {
					model: 'place_comments',
					key: 'comment_id'
				},
				onUpdate: 'cascade',
				onDelete: 'restrict',

			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		queryInterface.dropTable("place_images");
	}
};
