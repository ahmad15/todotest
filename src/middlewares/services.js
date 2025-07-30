const {
  Todo,
  User
} = require('../services');

/**
 * services constant
 * @param {object} req - request data
 * @param {object} res - response data
 * @param {function} next - next function
 * @returns {promise} - return next function
 */
const services = (req, res, next) => {
  const { config } = req.app.locals;

  res.locals.todoService = new Todo({
    todoDbConnector: res.locals.todoDbConnector
  });

  res.locals.userService = new User({
    config,
    userDbConnector: res.locals.userDbConnector
  });

  return next();
};

module.exports = services;
