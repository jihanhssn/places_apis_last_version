const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	const placeComments = sequelize.define('place_comments', {
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
		rating: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		hidden: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		is_deleted: {
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
			allowNull: true,
		}
	}, {});

	placeComments.prototype.toJSON = function () {
		let values = this.get();
		return values;
	};

	placeComments.associate = function (models) {
		placeComments.belongsTo(models.users, {
			foreignKey: 'user_id',
			onDelete: 'cascade',
			foreignKeyConstraint: true
		});
		placeComments.belongsTo(models.places, {
			foreignKey: 'place_id',
			onDelete: 'cascade',
			foreignKeyConstraint: true
		});
		placeComments.hasMany(models.place_images, {
			foreignKey: 'comment_id',
			onDelete: 'cascade',
			foreignKeyConstraint: true
		});
		placeComments.hasMany(models.comment_likes, {
			foreignKey: 'comment_id',
			onDelete: 'cascade',
			foreignKeyConstraint: true
		})
	};

	return placeComments;
}
