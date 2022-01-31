const Sequelize = require('sequelize');
const models = require('../../models');
const commentsModel = models.place_comments;
const placesModel = models.places;
const likesModel = models.comment_likes;
const usersModel = models.users;
const imageModel = models.place_images;

const commentIncludes = [
  {
    model: placesModel
  },
  {
    model: usersModel
  },
  {
    model: imageModel
  },
  {
    model: likesModel
  }
];

exports.createComment = async (comment) => {
  let dto = {
    comment: comment.comment,
    user_id: comment.user_id,
    place_id: comment.place_id,
    parent_comment_id: comment.parent_comment_id,
    rating: comment.rating
  }
  let createdObj = await commentsModel.create(dto);
  return Promise.resolve(createdObj.toJSON());
}

exports.getPlaceComments = async (placeId, pageNumber, pageSize) => {
  let offset = pageNumber * pageSize;
  let order = [["created_at", "DESC"]];

  let where = {
    place_id: placeId,
    is_deleted: false,
    parent_comment_id: null
  };

  let result = await commentsModel.findAll({
    where: where,
    order: order,
    include: commentIncludes,
    offset: offset,
    limit: pageSize,
    raw: false,
  });

  result = result.map(row => row.toJSON());
  return Promise.resolve(result);
}

exports.getCommentById = async (commentId) => {
  let result = await commentsModel.findOne({
    where: {
      comment_id: commentId,
      is_deleted: false
    },
    include: commentIncludes,
    raw: false
  });

  return Promise.resolve(result === null ? null : result.toJSON());
}

exports.getUserComments = async (user_id, pageNumber, pageSize) => {
  let offset = pageNumber * pageSize;
  let order = [["created_at", "DESC"]];

  let where = {
    user_id: user_id,
    is_deleted: false
  };

  let result = await commentsModel.findAll({
    where: where,
    order: order,
    include: commentIncludes,
    offset: offset,
    limit: pageSize,
    raw: false,
  });

  result = result.map(row => row.toJSON());
  return Promise.resolve(result);
}

exports.getCommentReplies = async (parentCommentId, pageNumber, pageSize) => {
  let offset = pageNumber * pageSize;
  let order = [["created_at", "DESC"]];

  let where = {
    parent_comment_id: parentCommentId,
    is_deleted: false,
  };

  let result = await commentsModel.findAll({
    where: where,
    order: order,
    include: commentIncludes,
    offset: offset,
    limit: pageSize,
    raw: false,
  });

  result = result.map(row => row.toJSON());
  return Promise.resolve(result);
}

exports.updateComment = async (updateObj, comment_id) => {
  let dto = {
    comment: updateObj.comment,
    rating: updateObj.rating
  }
  return commentsModel.update(dto, {
    where: {
      comment_id: comment_id
    }
  });
}

exports.increaseCommentCount = async (parentCommentId, commentsCount) => {
  return commentsModel.update({
    comments_count: commentsCount
  }, {
    where: {
      comment_id: parentCommentId
    }
  });
}

exports.decreaseCommentCount = async (parentCommentId, commentsCount) => {
  await commentsModel.update({
    comments_count: commentsCount
  }, {
    where: {
      comment_id: parentCommentId
    }
  });
}

exports.increaseCommentLikesCounts = async (commentId, likes_count) => {
  return commentsModel.update({
    likes_count: likes_count
  }, {
    where: {
      comment_id: commentId
    }
  });
}

exports.decreaseCommentLikesCounts = async (commentId, likes_count) => {
  return commentsModel.update({
    likes_count: likes_count
  }, {
    where: {
      comment_id: commentId
    }
  });
}

exports.markCommentAsDeleted = async (commentId) => {
  return await commentsModel.update({
    is_deleted: true,
    deleted_at: new Date()
  }, {
    where: {
      comment_id: commentId
    }
  });
}

exports.markCommentAsDeletedByPlaceId = async (placeId) => {
  let deletedObj = await commentsModel.update({
    is_deleted: true,
    deleted_at: new Date()
  }, {
    where: { place_id: placeId }
  })
  return Promise.resolve(deletedObj)
}