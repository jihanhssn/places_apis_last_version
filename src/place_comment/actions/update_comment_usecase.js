const i18n = require('i18n');
const exceptions = require('../../commons/errors/exceptions');
const commentS3Uploader = require('./comments_s3_uploader');
const Roles = require('../../commons/constants').UserRoles;
const commentDao = require('../comment_dao');
const userDao = require('../../user/user_dao');
const placeDao = require('../../places/place_dao');
const placeCache = require('../../places/place_cache');
const ratingPlace = require('./place_rating');

exports.updateComment = async (updateObj, commentId, userId, files) => {
    const user = await userDao.getById(userId);
    const comment = await commentDao.getCommentById(commentId);
    let place = await placeDao.getFullPlaceById(comment.place_id);

    if (user.role_id === Roles.ADMIN || (user.role_id === Roles.USER && comment.user_id === userId)) {
        await commentDao.updateComment(updateObj, comment.comment_id);

        if (updateObj.rating) {
            place = await ratingPlace.removePlaceRating(place, comment.rating);
            place = await ratingPlace.addPlaceRating(place, updateObj.rating);

            await placeDao.updatePlaceObjectBasedOnCommentsUpdates(comment.place_id, place);
            await placeCache.addPlaceToCache(comment.place_id, place);
        }

        if (files.images) {
            await commentS3Uploader.addCommentImages(comment, files.images);
        }
        return commentDao.getCommentById(commentId);
    } else {
        throw new exceptions.InvalidUserIdException(i18n.__('comment_not_yours'));
    }
}