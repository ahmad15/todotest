const bodyParser = require('body-parser');
const YAML = require('yamljs');
const fs = require('fs');

const Server = require('./src/server');

const config = require('./config');
const routes = require('./src/routes');
const setupMiddlewares = require('./src/middlewares');
const { DBConnector } = require('./src/connectors');

const swaggerYaml = fs.readFileSync('./docs/swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(swaggerYaml);

/**
 * configInitialization
 * @param {Object} app - app
 */
const configInitialization = async (app) => {
  Object.assign(app.locals, {
    config: config
  });
};

/**
 * dbInitialization
 * @param {Object} app - app
 */
const dbInitialization = async (app) => {
  Object.assign(app.locals, {
    db: await DBConnector(config.resources.db, app.locals.logger)
  });
};

const initializations = [
  configInitialization,
  dbInitialization
];

const middlewares = {
  pre: [
    // set strict to false, to support non-object body
    // e.g. PATCH /foreign-exchanges/settings/enabled
    // the body is only a boolean, not an object/array
    bodyParser.json({ strict: false }),
    ...setupMiddlewares
  ],
  post: []
};

/**
 * instantiation of J2MS. This has not made the server start listening!!!
 */
const ms = new Server({
  docs: swaggerDocument,
  config,
  initializations,
  middlewares,
  routes
});

/**
 * start listening on predefined host and port. (passed on instantiation)
 */
ms.listen();

/**
 * stopServer
 * @param {object} signal - signal object
 * @returns {function} - stop signal
 */
const stopServer = (signal) => {
  return ms.stop(signal);
};

process.on('SIGINT', stopServer);
process.on('SIGTERM', stopServer);
process.stdout.on('error', function (err) {
  if (err.code == "EPIPE") {
    process.exit(0);
  }
});
