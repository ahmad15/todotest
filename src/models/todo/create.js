const Joi = require('joi');

const createTodoSchema = Joi.object({
  title: Joi.string()
    .required()
    .description('Title')
    .example('Test Code'),
  content: Joi.string()
    .required()
    .description('Content')
    .example('Do the test code')
}).label('crateTodo');

module.exports = createTodoSchema;
