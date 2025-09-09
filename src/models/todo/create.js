const Joi = require('joi');

const createTodoSchema = Joi.object({
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
}).label('crateTodo');

module.exports = createTodoSchema;
