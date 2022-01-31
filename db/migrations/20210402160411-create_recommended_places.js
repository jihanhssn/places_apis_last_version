'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		queryInterface.createTable("recommended_places", {
			recommended_id: {
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
		queryInterface.dropTable("recommended_places");
	}
};
