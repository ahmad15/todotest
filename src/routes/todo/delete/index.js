const express = require('express');
const { createHandler } = require('../../../handlers/common');
const {
  todoDeleteHandler: handler
} = require('../../../handlers/todo');

const router = express.Router();

router.delete(
  '/todo/:id',
  createHandler(handler)
);

module.exports = router;
