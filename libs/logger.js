let pino = require('pino');
let pinoToSeq = require('pino-seq');

let stream = pinoToSeq.createStream({
  serverUrl: process.env.LOGGER_URL,
  apiKey: process.env.LOGGER_KEY,
  level: 'debug',
});

let logger = (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development') ?
  pino({
    prettyPrint: {
      colorize: true,
      ignore: 'pid,hostname',
      timestampKey: 'time',
    },
    level: 'debug',
  }) :
  pino({
    name: "lemonPlaces-" + process.env.NODE_ENV,
    level: 'debug',
  }, stream);

module.exports = logger;