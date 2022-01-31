'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		queryInterface.createTable("place_comments", {
			comment_id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			comment: {
				type: Sequelize.TEXT,
				allowNull: true,
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
			parent_comment_id: {
				type: Sequelize.BIGINT,
				allowNull: true,
			},
			likes_count: {
				type: Sequelize.INTEGER,
				allowNull: true,
				defaultValue: 0,
			},
			comments_count: {
				type: Sequelize.INTEGER,
				allowNull: true,
				defaultValue: 0,
			},
			rating:{
				type:Sequelize.INTEGER,
				allowNull:false,
				defaultValue:0
			},
			is_deleted:{
				type:Sequelize.BOOLEAN,
				allowNull:false,
				defaultValue:false
			},
			hidden:{
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
				onUpdate: 'cascade',
				onDelete: 'restrict'
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			deleted_at:{
				type:Sequelize.DATE,
				allowNull:true,
			}
		}), {};
	},

	down: async (queryInterface, Sequelize) => {
		queryInterface.dropTable("place_comments");
	}
};
