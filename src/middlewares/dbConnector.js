const {
  TodoDbConnector,
  UserDbConnector
} = require('../connectors');

/**
 * dbConnector constant
 * @param {object} req - request data
 * @param {object} res - response data
 * @param {function} next - next function
 * @returns {promise} - return next function
 */
const dbConnector = (req, res, next) => {
  res.locals.todoDbConnector = new TodoDbConnector({
    db: req.app.locals.db,
    logger: req.app.locals.logger
  });

  res.locals.userDbConnector = new UserDbConnector({
    db: req.app.locals.db,
    logger: req.app.locals.logger
  });

  return next();
};

module.exports = dbConnector;
