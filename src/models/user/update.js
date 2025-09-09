const Joi = require('joi');

const updateUserSchema = Joi.object({
  name: Joi.string()
    .required()
    .description('Name')
    .example('User name'),
  email: Joi.string()
    .email()
    .required()
    .description('Email')
    .example('test@email.com'),
  oldPassword: Joi.string()
    .description('Old Password')
    .example('olDp@ssword'),
  password: Joi.string()
    .description('Password')
    .example('p@ssword')
}).label('updateUser');

module.exports = updateUserSchema;
