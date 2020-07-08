const express = require('express');
const { createHandler } = require('../../../handlers/common');
const {
  todoListHandler: handler
} = require('../../../handlers/todo');

const router = express.Router();

router.get(
  '/todos',
  createHandler(handler)
);

module.exports = router;
