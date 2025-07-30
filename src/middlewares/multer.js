const multer = require('multer');

/**
 * image upload function
 */
const imageUpload = multer({
  storage: multer.diskStorage(
    {
      destination: function (req, file, cb) {
        cb(null, 'images');
      },
      filename: function (req, file, cb) {
        cb(
          null,
          new Date().valueOf() + 
          '_' +
          file.originalname
        );
      },
      fileFilter: (req, file, cb) => {
        const { config } = req.app.locals;
        const whitelist = config.images.whitelist.split(',');

        if (whitelist.indexOf(file.mimetype) !== -1) {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error(`Invalid upload: file format should be ${whitelist.join(',')}`));
        }
      }
    }
  )
});

module.exports = imageUpload;