'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		queryInterface.createTable("place_favorites", {
			favorite_id: {
				type: Sequelize.BIGINT,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			place_id: {
				type: Sequelize.STRING,
				allowNull: false,
				references: {
					model: 'places',
					key: 'place_id',
				},
				onUpdate: 'cascade',
				onDelete: 'restrict',
			},
			user_id: {
				type: Sequelize.STRING,
				allowNull: false,
				references: {
					model: 'users',
					key: 'user_id',
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
		}, {});
	},

	down: async (queryInterface, Sequelize) => {
		queryInterface.dropTable("place_favorites");
	}
};
