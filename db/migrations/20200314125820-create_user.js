module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
        user_id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.STRING,
        },
        full_name: {
            type: Sequelize.STRING,
        },
        s3_id: Sequelize.STRING,
        mobile: {
            type: Sequelize.STRING,
            unique: true,
        },
        email: {
            type: Sequelize.STRING,
        },
        role_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        created_at: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
        },
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('users'),
};
