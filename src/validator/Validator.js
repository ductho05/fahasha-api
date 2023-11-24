const Joi = require('joi')


class Validator {
    authValidator = Joi.object({
        email: Joi.string().email().max(225).required(),
        password: Joi.string().pattern(
            new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        ).required()
    })
}

module.exports = new Validator
