const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	const amenity = sequelize.define('amenities', {
		amenity_id: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		amenity: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		visible: {
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
	}, {});

	amenity.prototype.toJSON = function () {
		let values = this.get();
		return values;
	};

	amenity.associate = function (models) {
		amenity.belongsTo(models.places, {
			foreignKey: 'amenity_id',
			onDelete: 'cascade',
			foreignKeyConstraint: true
		})
	}

	return amenity;
}
