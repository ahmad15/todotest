/**
 * base handler for request/response
 * @param {function} handler - request handler
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function
 * @returns {promise} next
 */
const createHandler = (handler) => {
  return async (req, res, next) => {
    let error;
    const { logger } = req.app.locals;

    try {
      await handler(req, res);
    } catch (err) {
      // console.log(err);
      error = err;
      logger.error(`createHandler: handling error: ${err}`);

      return res.status(err.statusCode || 500).send({
        code: error.code || 'INTERNAL_SERVER_ERROR',
        statusCode: err.statusCode || 500,
        message: err.message || err,
        error: error.error || err
      });
    }

    return next(error);
  };
};

module.exports = createHandler;
