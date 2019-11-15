const Joi = require('@hapi/joi')

const validate = require('./index')

exports.ValidateLogin = () => (req, res, next) => {
    const schema = Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
    })

    const { error } = Joi.validate(req.body, schema)
    if (error) {
        return res.json({
            status:200,
            message:"validate login form.",
            errors: validate.validateError(error),
            success: false
        })
    }

    next()
}

exports.Register = () => (req, res, next) => {
    const schema = Joi.object().keys({
        firstname: Joi.string().min(6).max(16).required(),
        lastname: Joi.string().min(6).max(16),
        username: Joi.string().min(6).max(16).required(),
        password: Joi.string().min(8).max(20).required(),
        email: Joi.string().email(),
        birthdate: Joi.date().allow(""),
        gendar: Joi.string().max(1).allow(""),
        profile_img: Joi.object().allow(""),
    })

    const { error } = schema.validate(req.body);
    if (error) {
        return res.json({
            status:200,
            message:error.details[0].message,
            errors: validate.validateError(error),
            success: false
        })
    }

    next()
}