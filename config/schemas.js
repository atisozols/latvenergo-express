const Joi = require('joi');

const inputSchema = Joi.object({
  query: Joi.string().min(1).required(),
  page: Joi.number().integer().min(1).required(),
});

const outputSchema = Joi.array().items(
  Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    final_price: Joi.number().required()
  })
);

const errorSchema = Joi.object({
  code: Joi.number().required(),
  message: Joi.string().required()
});

module.exports = { inputSchema, outputSchema, errorSchema };
