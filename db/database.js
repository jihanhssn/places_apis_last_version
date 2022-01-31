require('dotenv').config()

const config = {
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: process.env.DB_DIALECT,
	logging: process.env.DB_LOGGING === 'true' ? console.log : false,
	dialectOptions: {
		charset: process.env.DB_CHARSET,
		decimalNumbers: true,
	},
	define: {
		charset: process.env.DB_CHARSET,
		collate: process.env.DB_COLLATE,
		timestamps: true,
		underscored: true,
		underscoredAll: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
	pool: {
		max: parseInt(process.env.DB_POOL_MAX),
		min: parseInt(process.env.DB_POOL_MIN),
		idle: parseInt(process.env.DB_POOL_IDLE),
	},
};

module.exports = {
	development: config,
	local: config,
	production: config,
};
