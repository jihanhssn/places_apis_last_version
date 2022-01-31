const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	const placeFavorites = sequelize.define('place_favorites', {
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




	placeFavorites.associate = function (models) {
		placeFavorites.belongsTo(models.users, {
			foreignKey: 'user_id',
			onDelete: 'cascade',
			foreignKeyConstraint: true
		});
		placeFavorites.belongsTo(models.places, {
			foreignKey: 'place_id',
			onDelete: 'cascade',
			foreignKeyConstraint: true
		});

	},
		placeFavorites.prototype.toJSON = function () {
			let values = this.get();
			return values;
		};

	return placeFavorites;
}
