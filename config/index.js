require('dotenv').config();
const { Env } = require('../src/helpers');
const pkg = require('../package.json');

const config = {
  name: Env.getString('SERVICE_NAME', process.env, true) || pkg.name,
  description: Env.getString('SERVICE_DESCRIPTION', process.env, true) || pkg.description,
  host: Env.getString('SERVICE_HOST', process.env, true) || '0.0.0.0',
  port: Env.getInteger('SERVICE_PORT', process.env, true) || 5000,
  logger: {
    name: Env.getString('SERVICE_NAME', process.env, true) || pkg.name,
    level: Env.getString('LOG_LEVEL', process.env, true) || 'trace'
  },
  resources: {
    db: {
      host: Env.getString('DB_HOST'),
      database: Env.getString('DB_NAME'),
      port: Env.getInteger('DB_PORT'),
      user: Env.getString('DB_USER'),
      password: Env.getString('DB_PASSWORD')
    }
  }
};

module.exports = config;
