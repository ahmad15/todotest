const express = require('express');
const { createHandler } = require('../../../handlers/common');
const {
  userDetailHandler: handler
} = require('../../../handlers/user');
const authentication = require('../../../middlewares/authentication');

const router = express.Router();

router.get(
  '/user/:id',
  authentication,
  createHandler(handler)
);

module.exports = router;
