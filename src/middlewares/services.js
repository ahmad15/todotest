const {
  Todo
} = require('../services');

/**
 * services constant
 * @param {object} req - request data
 * @param {object} res - response data
 * @param {function} next - next function
 * @returns {promise} - return next function
 */
const services = (req, res, next) => {
  res.locals.todoService = new Todo({
    todoDbConnector: res.locals.todoDbConnector
  });

  return next();
};

module.exports = services;
