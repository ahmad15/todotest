const Joi = require('joi');

const authUserSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .required()
    .description('Email address')
    .example('ahmad@email.com'),
  password: Joi.string()
    .required()
    .description('Password')
    .example('password'),
}).label('authUserSchema');

module.exports = authUserSchema;
