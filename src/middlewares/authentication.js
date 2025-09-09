const jwt = require('jsonwebtoken');

/**
 * authentication constant
 * @param {object} req - request data
 * @param {object} res - response data
 * @param {function} next - next function
 * @returns {promise} - return next function
 */
const authentication = (req, res, next) => {
  const { config } = req.app.locals;
  let token = req.headers['authorization']; // Express headers are auto converted to lowercase

  if(!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({
        code: 'TOKEN_NOT_VALID',
        message: 'Auth token is not supplied'
      });
  }

  // Remove Bearer from string
  token = token.slice(7, token.length);

  jwt.verify(token, config.jwt.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        code: 'TOKEN_NOT_VALID',
        message: 'Token is not valid'
      });
    } else {
      req.decoded = decoded;
      next();
    }
  });
};

module.exports = authentication;