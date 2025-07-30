const express = require('express');
const bodyParser = require('body-parser');
const { createHandler } = require('../../../handlers/common');
const {
  todoUpdateHandler: handler
} = require('../../../handlers/todo');
const authentication = require('../../../middlewares/authentication');

const validateSchema = require('./validateSchema');

const router = express.Router();

router.patch(
  '/todo/:id',
  authentication,
  bodyParser.json(),
  validateSchema,
  createHandler(handler)
);

module.exports = router;
