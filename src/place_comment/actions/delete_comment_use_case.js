const i18n = require('i18n');
const exceptions = require('../../commons/errors/exceptions');
const Roles = require('../../commons/constants').UserRoles;
const commentDao = require('../comment_dao');
const userDao = require('../../user/user_dao');
const placeDao = require('../../places/place_dao');
const placeCache = require('../../places/place_cache');
const ratingPlace = require('./place_rating');

exports.deleteComment = async (commentId, userId) => {
    const user = await userDao.getById(userId);
    const comment = await commentDao.getCommentById(commentId);
    let place = await placeDao.getPlaceById(comment.place_id);

    if (!comment) {
        throw new exceptions.NotFoundException(i18n.__('comment_not_found'));
    }
    if (user.role_id === Roles.ADMIN || (user.role_id == Roles.USER && comment.user_id == userId)) {
        if (comment.rating) {
            place = await ratingPlace.removePlaceRating(place, comment.rating);
        }

        if (comment.parent_comment_id) {
            let parentComment = await commentDao.getCommentById(comment.parent_comment_id);
            let comment_counts = parentComment.comments_count + 1;
            await commentDao.decreaseCommentCount(comment.parent_comment_id, comment_counts)
        }

        const deletedComment = await commentDao.markCommentAsDeleted(commentId);

        place.comments_count = place.comments_count - 1;
        await placeDao.updatePlaceObjectBasedOnCommentsUpdates(comment.place_id, place);
        await placeCache.addPlaceToCache(comment.place_id, place)

        return deletedComment;
    } else {
        throw new exceptions.InvalidUserIdException(i18n.__('comment_not_yours'));
    }
}