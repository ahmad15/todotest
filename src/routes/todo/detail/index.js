const express = require('express');
const { createHandler } = require('../../../handlers/common');
const {
  todoDetailHandler: handler
} = require('../../../handlers/todo');
const authentication = require('../../../middlewares/authentication');

const router = express.Router();

router.get(
  '/todo/:id',
  authentication,
  createHandler(handler)
);

module.exports = router;
