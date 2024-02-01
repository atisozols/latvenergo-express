const Joi = require('joi')

const inputSchema = Joi.object({
    query: Joi.string().min(1).required(),
    page: Joi.number().integer().min(1).required()
})

module.exports = { inputSchema }