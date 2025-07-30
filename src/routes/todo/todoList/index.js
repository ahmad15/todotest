const express = require('express');
const { createHandler } = require('../../../handlers/common');
const {
  todoListHandler: handler
} = require('../../../handlers/todo');
const authentication = require('../../../middlewares/authentication');

const router = express.Router();

router.get(
  '/todos',
  authentication,
  createHandler(handler)
);

module.exports = router;
