const express = require('express');
const { createHandler } = require('../../../handlers/common');
const {
  todoDeleteHandler: handler
} = require('../../../handlers/todo');
const authentication = require('../../../middlewares/authentication');

const router = express.Router();

router.delete(
  '/todo/:id',
  authentication,
  createHandler(handler)
);

module.exports = router;
