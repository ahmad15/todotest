const ExtendableError = require('es6-error');

/**
 * CustomError
 *
 * The CustomError is the base class for all errors which will get special
 *
 * @class CustomError
 * @extends {ExtendableError}
 */
class CustomError extends ExtendableError {

  /**
   * Creates an instance of CustomError.
   *
   * All  Errors have a message an a code. The code is set to specific
   * values in base classes only.
   * @param {string} message - the error message, defaults to: 'Downstream Error'.
   * @param {string} code - the error code, defaults to: 'DEFAULT_ERROR'.
   * @param {number} statusCode - the HTTP status code, defaults to: '500'.
   * @param {Object} data - the error object and/or additional data.
   * @memberof CustomError
   */
  constructor(message = ' error occurred', code = 'DEFAULT_ERROR', statusCode = 500, data) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.data = data;
  }
}

module.exports = CustomError;
