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

    idCategoryValidator = Joi.number().min(1).max(999).required()

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

    categoryValidator = Joi.object({
        name: Joi.string().trim().min(1).max(255).required(),
        status: Joi.string().valid("Hoạt động", "Không hoạt động"),
        field: Joi.string().pattern(new RegExp(/^[a-fA-F0-9]{24,}$/)).required()
    })

    categoryUpdateValidator = Joi.object({
        name: Joi.string().trim().min(1).max(255),
        status: Joi.string().valid("Hoạt động", "Không hoạt động"),
        field: Joi.string().pattern(new RegExp(/^[a-fA-F0-9]{24,}$/))
    })

    evaluateValidator = Joi.object({
        comment: Joi.string().trim().min(1).required(),
        rate: Joi.number().min(1).max(5).required(),
        product: Joi.string().pattern(new RegExp(/^[a-fA-F0-9]{24}$/)).required(),
        user: Joi.string().pattern(new RegExp(/^[a-fA-F0-9]{24}$/)).required()
    })

    notificationValidator = Joi.object({
        title: Joi.string().trim().min(1).required(),
        description: Joi.string().trim().min(1).required(),
        image: Joi.string().pattern(new RegExp(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)).required(),
        url: Joi.string().pattern(new RegExp(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}/)).required(),
        user: Joi.string().pattern(new RegExp(/^[a-fA-F0-9]{24}$/))
    })
}

module.exports = new Validator
