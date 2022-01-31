const redis = require('redis');
const config = require('./config');
const logger = require('../libs/logger');

const port = config.redisPort;
const host = config.redisHost;
const password = config.redisPassword;

const client = redis.createClient(port, host, {
  retry_strategy: function (options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      logger.error('Redis error: ' + options.error);
      return new Error('The server refused the connection');
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      return new Error('Retry time exhausted');
    }
    if (options.attempt > 30) {
      return undefined;
    }
    return 3000;
  },
});

client.on('connect', function () {
  logger.info('Redis is connected');
});

client.on('ready', function () {
  logger.info('Redis is ready');
});

client.on('reconnecting', function () {
  logger.info('Redis is reconnecting');
});

client.on('end', function (err) {
  logger.info(`Redis ended!: ${err}`);
});

client.on('error', function (err) {
  logger.error(`Redis error: ${err}`);
});

if (password !== null && password !== undefined && password !== '') {
  client.auth(password, function (err) {
    if (err) {
      logger.error(`Redis Auth error: ${err}`);
    }
  });
}

exports.client = client;