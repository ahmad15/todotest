const express = require('express');
const { createHandler } = require('../../../handlers/common');
const {
  todoDetailHandler: handler
} = require('../../../handlers/todo');

const router = express.Router();

router.get(
  '/todo/:id',
  createHandler(handler)
);

module.exports = router;
