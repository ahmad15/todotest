const Pool = require('pg').Pool
/**
 * connectPostgreSQL
 * @param {object} dbConfig - dbConfig object
 * @param {object} logger - logger object
 */
const connectPostgreSQL = async (dbConfig, logger) => {
  logger.info('Connecting to database...');
  const pool = new Pool(dbConfig)
  return pool;
};

module.exports = connectPostgreSQL;