const express = require('express');
const bodyParser = require('body-parser');
const { createHandler } = require('../../../handlers/common');
const {
  userUpdateHandler: handler
} = require('../../../handlers/user');
const authentication = require('../../../middlewares/authentication');

const validateSchema = require('./validateSchema');

const router = express.Router();

router.patch(
  '/user/profile/:id',
  authentication,
  validateSchema,
  createHandler(handler)
);

module.exports = router;
