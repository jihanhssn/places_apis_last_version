module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        user_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING,
        },
        full_name: {
            type: DataTypes.STRING,
        },
        s3_id: DataTypes.STRING,
        mobile: {
            type: DataTypes.STRING,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    }, {});

    User.prototype.toJSON = function () {
        let values = this.get();

        if (values['s3_id']) {
            values['url'] = 'https://s3.eu-central-1.amazonaws.com/lemontaxi-dev/users/' + values['s3_id'] + '.jpeg';
            values['thumbnail_url'] = 'https://s3.eu-central-1.amazonaws.com/lemontaxi-dev/users/' + values['s3_id'] + '-thumb1.jpeg';
        } else {
            values['url'] = null;
            values['thumbnail_url'] = null;
        }

        return values;
    };

    User.associate = function (models) {
    };

    return User;
};
