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

  if(!token){
    return res.status(401).json({
        message: 'Token is not found'
      });
  }

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(406).json({
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = authentication;