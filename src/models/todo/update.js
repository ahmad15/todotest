const Joi = require('joi');

const updateTodoSchema = Joi.object({
  title: Joi.string()
    .required()
    .description('Title')
    .example('Test Code'),
  content: Joi.string()
    .required()
    .description('Content')
    .example('Do the test code'),
  done: Joi.boolean()
    .required()
    .description('Done')
    .example(true)
}).label('crateTodo');

module.exports = updateTodoSchema;
