const s3Uploader = require('../../../libs/s3Uploader');
const imageDao = require('../../place_image/place_image_dao');

exports.addCommentImages = async (comment, files) => {
    let commentsImages = [];

    for (let file of files) {
        let s3;
        if (process.env.S3_UPLOAD_WITH_NO_COMPRESSION === "true") {
            s3 = await s3Uploader.uploadImageWithNoCompression(comment.place_id, file.path, file.filename, true);
        } else {
            let result = await s3Uploader.uploadCommentImage(comment.place_id, file.path);
            s3 = result.s3_id;
        }
        const image = {
            s3_id: s3,
            user_id: comment.user_id,
            comment_id: comment.comment_id,
            place_id: comment.place_id,
            comment_image: true
        };
        const images = await imageDao.addPlaceCommentImage(image);
        commentsImages.push(images);
    }
    return commentsImages;
}