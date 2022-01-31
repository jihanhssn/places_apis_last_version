const models = require('../../models');
const likesModel = models.comment_likes;
const userModel = models.users

exports.getCommentLikes = async (commentId) => {
	let result = await likesModel.findAll({
		where: {
			comment_id: commentId
		},
		include: [{
			model: userModel
		}]
	})
	result = result.map(row => row.toJSON());
	return Promise.resolve(result);
}

exports.isLiked = async (commentId, userId) => {
	let result = await likesModel.findOne({
		where: {
			comment_id: commentId,
			user_id: userId
		}
	})
	return Promise.resolve(result === null ? null : result.toJSON());
}

exports.createLike = async (commentId, userId) => {
	let createdObj = await likesModel.create({
		comment_id: commentId,
		user_id: userId
	});

	return Promise.resolve(createdObj.toJSON());
}

exports.deleteLike = async (likeId) => {
	return likesModel.destroy({
		where: {
			like_id: likeId
		}
	});
}