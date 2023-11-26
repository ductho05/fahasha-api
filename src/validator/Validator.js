const Joi = require('joi')

class Validator {

    authValidator = Joi.object({
        email: Joi.string().email().max(225).required(),
        password: Joi.string().pattern(
            new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        ).required()
    })

    authFacebookValidator = Joi.object({
        faceId: Joi.string().required(),
        email: Joi.string().email().max(225).required(),
        username: Joi.string().required(),
        image: Joi.string().required()
    })

    emailValidator = Joi.string().email().max(225).required()

    idValidator = Joi.string().pattern(new RegExp(/^[a-fA-F0-9]{24,}$/)).required()

    userValidator = Joi.object({
        fullName: Joi.string().trim().min(3).max(255).required(),
        gender: Joi.string().valid("male", "female", "other"),
        address: Joi.string().trim().min(5).required(),
        city: Joi.string().trim().min(5).required(),
        phoneNumber: Joi.string().pattern(
            new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
        ).required(),
        birth: Joi.string().pattern(
            new RegExp(/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/)
        ).required(),
        email: Joi.string().email().max(225).required(),
        password: Joi.string().pattern(
            new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        ).required()
    })

    userUpdateValidator = Joi.object({
        fullName: Joi.string().trim().min(3).max(255),
        gender: Joi.string().valid("male", "female", "other"),
        address: Joi.string().trim().min(5),
        city: Joi.string().trim().min(5),
        phoneNumber: Joi.string().pattern(
            new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
        ),
        birth: Joi.string().pattern(
            new RegExp(/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/)
        ),
        email: Joi.string().email().max(225),
        password: Joi.string().pattern(
            new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        )
    })
}

module.exports = new Validator
