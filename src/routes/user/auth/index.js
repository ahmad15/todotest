const express = require('express');
const bodyParser = require('body-parser');
const { createHandler } = require('../../../handlers/common');
const {
  userAuthHandler: handler
} = require('../../../handlers/user');

const validateSchema = require('./validateSchema');

const router = express.Router();

router.post(
  '/auth',
  bodyParser.json(),
  validateSchema,
  createHandler(handler)
);

module.exports = router;
