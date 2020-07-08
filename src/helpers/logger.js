const bunyan = require('bunyan');
/**
 * create logger
 * @param  {object} opts bunyan logger option
 * @returns {object}      logger
 */
const createLogger = (opts) => {
  return bunyan.createLogger(opts);
};

module.exports = createLogger;
