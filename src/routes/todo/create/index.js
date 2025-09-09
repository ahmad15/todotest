const express = require('express');
const bodyParser = require('body-parser');

const { createHandler } = require('../../../handlers/common');
const {
  todoCreateHandler: handler
} = require('../../../handlers/todo');
const authentication = require('../../../middlewares/authentication');
const upload = require('../../../middlewares/upload');

const validateSchema = require('./validateSchema');

const router = express.Router();

router.post(
  '/todo',
  upload,
  authentication,
  validateSchema,
  createHandler(handler)
);

module.exports = router;
