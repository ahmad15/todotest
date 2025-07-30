const Joi = require('joi');

const updateTodoSchema = Joi.object({
  title: Joi.string()
    .required()
    .description('Title')
    .example('Test Code'),
  description: Joi.string()
    .required()
    .description('Description')
    .example('Do the test code'),
  deadline: Joi.date()
    .required()
    .description('Deadline'),
  done: Joi.boolean()
    .required()
    .description('Done')
    .example(true)
}).label('crateTodo');

module.exports = updateTodoSchema;
