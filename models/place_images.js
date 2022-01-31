const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const placeImage = sequelize.define('place_images', {
    image_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    s3_id: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    user_id: {
      type: Sequelize.STRING,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id',
      },
      onUpdate: 'cascade',
      onDelete: 'restrict',
    },
    place_id: {
      type: Sequelize.STRING,
      allowNull: true,
      references: {
        model: 'places',
        key: 'place_id',
      },
      onUpdate: 'cascade',
      onDelete: 'restrict',
    },
    comment_id: {
      type: Sequelize.BIGINT,
      allowNull: true,
      references: {
        model: 'place_comments',
        key: 'comment_id'
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
    }
  }, {});

  placeImage.prototype.toJSON = function () {
    let values = this.get();

    if (values.s3_id) {
      if (values.comment_id) {
        values.image = process.env.S3_DOMAIN + '/' + process.env.S3_PLACES_FOLDER + '/' + values.place_id + '/' + process.env.S3_COMMENTS_FOLDER + '/' + values.s3_id + '.png';
      } else if (values.place_id) {
        values.image = process.env.S3_DOMAIN + '/' + process.env.S3_PLACES_FOLDER + '/' + values.place_id + '/' + values.s3_id + '.png';
      }
    } else {
      values.image = null;
    }

    delete values.s3_id;

    return values;
  };

  return placeImage;
}

