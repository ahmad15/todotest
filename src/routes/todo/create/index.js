const express = require('express');
const bodyParser = require('body-parser');

const { createHandler } = require('../../../handlers/common');
const {
  todoCreateHandler: handler
} = require('../../../handlers/todo');
const authentication = require('../../../middlewares/authentication');
const imageUpload = require('../../../middlewares/multer');

const validateSchema = require('./validateSchema');

const router = express.Router();

router.post(
  '/todo',
  imageUpload.single('snapshot'),
  authentication,
  bodyParser.json(),
  validateSchema,
  createHandler(handler)
);

module.exports = router;
