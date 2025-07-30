const cors = require('cors');

/**
 * cors constant
 * @param {object} req - request data
 * @param {object} res - response data
 * @param {function} next - next function
 * @returns {promise} - return next function
 */
const corsHandler = (req, res, next) => {
  const { config } = req.app.locals;
  const whitelist = config.cors.whitelist.split(',');

  const corsOptions = {
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

  whitelist.forEach(url => {
    res.header("Access-Control-Allow-Origin", url); // update to match the domain you will make the request from
  });

  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE, PATCH");
  cors(corsOptions);
  next();
};

module.exports = corsHandler;
