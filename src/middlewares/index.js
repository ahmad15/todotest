const dbConnector = require('./dbConnector');
const services = require('./services');
const cors = require('./cors');

module.exports = [
  dbConnector,
  services,
  cors
];
