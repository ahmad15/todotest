const Joi = require('joi');
const { updateTodoSchema: schema } = require('../../../models/todo');
const CustomError = require('../../../helpers/customError');

/**
 * validateSchema function
 * @param {object} req - request object
 * @param {object} res - result object
 * @param {function} next - next function
 * @returns {function} next function
 */
const validateSchema = (req, res, next) => {
  const result = Joi.validate(req.body, schema);
  const isValidationError = result.error;
  if (isValidationError) {
    return next(new CustomError(isValidationError.message, 'BAD_USER_INPUT', 400));
  }
  return next();
};

module.exports = validateSchema;
