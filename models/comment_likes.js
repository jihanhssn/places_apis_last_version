const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	const commentLikes = sequelize.define('comment_likes', {
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

	commentLikes.prototype.toJSON = function () {
		let values = this.get();
		return values;
	};

	commentLikes.associate=function(models){
		commentLikes.belongsTo(models.users,{
			foreignKey: 'user_id',
			onDelete: 'cascade',
			foreignKeyConstraint: true
		})
	}
	return commentLikes;
}
