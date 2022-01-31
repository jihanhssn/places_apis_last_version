const i18n = require('i18n');
const commentDao = require('../comment_dao');
const exceptions = require('../../commons/errors/exceptions');
const placeDao = require('../../places/place_dao');
const commentS3Uploader = require('./comments_s3_uploader');
const placeCache = require('../../places/place_cache');
const ratingPlace = require('./place_rating');

exports.createComment = async (comment, files) => {
    let place = await placeDao.getFullPlaceById(comment.place_id);
    if (!place) {
        throw new exceptions.NotFoundException(i18n.__('place_not_found'));
    }

    let parentComment
    if (comment.parent_comment_id) {
        parentComment = await commentDao.getCommentById(comment.parent_comment_id);
        if (!parentComment) {
            throw new exceptions.NotFoundException(i18n.__('comment_not_found'));
        }
    }

    if (comment.rating) {
        place = await ratingPlace.addPlaceRating(place, comment.rating);
    }

    place.comments_count = place.comments_count + 1;
    await placeDao.updatePlaceObjectBasedOnCommentsUpdates(comment.place_id, place);
    await placeCache.addPlaceToCache(comment.place_id, place);

    const result = await commentDao.createComment(comment);

    if (result.parent_comment_id) {
        let comments_count = parentComment.comments_count + 1;
        await commentDao.increaseCommentCount(result.parent_comment_id, comments_count,);
    }

    if (files) {
        await commentS3Uploader.addCommentImages(result, files);
    }
    
    return commentDao.getCommentById(result.comment_id);
}