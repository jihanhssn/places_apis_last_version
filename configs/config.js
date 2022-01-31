require('dotenv').config({path: __dirname + '/../.env'});

exports.identityAuthenticatorRpcIp = process.env.IDENTITY_AUTH_RPC_IP;
exports.supportAppId = process.env.SUPPORT_APP_ID;
exports.supportAppSecret = process.env.SUPPORT_APP_SECRET;
exports.clientId = process.env.IDENTITY_LEMON_APP_ID;
exports.clientSecret = process.env.IDENTITY_LEMON_APP_SECRET;

// Redis configuration
exports.redisPort = process.env.REDIS_PORT;
exports.redisHost = process.env.REDIS_HOST;
exports.redisPassword = process.env.REDIS_PASS;

