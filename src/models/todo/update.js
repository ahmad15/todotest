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
  status: Joi.string()
    .required()
    .description('Status')
    .example('todo'),
  done: Joi.boolean()
    .description('Done')
    .example(true)
}).label('updateTodo');

module.exports = updateTodoSchema;
