const Multer = require('multer');

/**
 * Middleware to accept multipart/form-data
 *
 * @param {object} req - req express
 * @param {object} res - res express
 * @param {object} next - next handler express
 */
const upload = (req, res, next) => {
  const { config } = req.app.locals;
  const maxFileSize = config.images.maxFileSize;
  const whitelist = config.images.whitelist.split(',');
  console.log( `Max file size: ${maxFileSize} bytes`);
  

  Multer({
    storage: Multer.diskStorage(
      {
        destination: function (req, file, next) {
          next(null, 'images');
        },
        filename: function (req, file, next) {
          next(
            null,
            new Date().valueOf() + '_' +file.originalname
          );
        }
      }
    ),
    fileFilter: (req, file, next) => {
      if (!whitelist.includes(file.mimetype)) {
        return res.status(406).json({
          message: `File type ${file.mimetype} is not allowed`
        });
      }

      next(null, true);
    },
    limits: {
      fileSize: Number(maxFileSize)
    }
  }).single('file')(req, res, (error) => {
    if (error) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({
          message: `File size exceeds the limit of ${maxFileSize} bytes`
        });
      }

      if (error.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({
          message: 'Unexpected file field'
        });
      }

      if (error.code === 'MulterError') {
        return res.status(400).json({
          message: error.message
        });
      }

      console.error('Multer error:', error);

      return res.status(500).json({
        message: 'Internal server error while processing file upload'
      });
    }

    next();
  });
}

module.exports = upload;