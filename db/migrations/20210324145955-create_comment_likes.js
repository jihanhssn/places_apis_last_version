'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		queryInterface.createTable("comment_likes", {
			like_id: {
				type: Sequelize.BIGINT,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			comment_id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: 'place_comments',
					key: 'comment_id',
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
		queryInterface.dropTable("comment_likes");
	}
};
