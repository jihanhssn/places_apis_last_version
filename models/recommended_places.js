const Sequelize = require('sequelize');
const i18n = require("i18n");
module.exports = (sequelize, DataTypes) => {
	const recommendedPlaces = sequelize.define('recommended_places', {
		recommended_id: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		place_id: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
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
	}, {});

	recommendedPlaces.prototype.toJSON = function () {
		let values = this.get();
		return values;
	};

	recommendedPlaces.associate = function (models) {
		recommendedPlaces.belongsTo(models.places, {
			foreignKey: 'place_id',
			onDelete: 'cascade',
			foreignKeyConstraint: true
		})
	};

	return recommendedPlaces;
}
