const express = require('express');
const bodyParser = require('body-parser');
const { createHandler } = require('../../../handlers/common');
const {
  todoCreateHandler: handler
} = require('../../../handlers/todo');

const validateSchema = require('./validateSchema');

const router = express.Router();

router.post(
  '/todo',
  bodyParser.json(),
  validateSchema,
  createHandler(handler)
);

module.exports = router;
