const Joi = require('@hapi/joi')
const validate = require('./index')

exports.createUser = () => (req, res, next) => {
    
    const schema = Joi.object().keys({
        name: Joi.string().min(6).max(16).required(),
        username: Joi.string().min(6).max(16).required(),
        password: Joi.string().min(8).max(20).required(),
        age: Joi.number().allow(''),
        email: Joi.string().email(),
    })

    // const { error } = Joi.validate(req.body , schema)
    const { error } = schema.validate(req.body);
    // console.log(error);
    // console.log(error.details[0].message);
    // console.log(validate.validateError(error));
    
    
    if (error) {
        return res.json({
            status:200,
            success: false,
            message: error.details[0].message,
            errors: validate.validateError(error)
        })
    }

    next()
}

// exports.validateUserFormUpdate = () => (req, res, next) => {
//     const schema = Joi.object().keys({
//         age: Joi.number().required(),
//         email: Joi.string().email().required()
//     })

//     const { error } = Joi.validate(req.body, schema)
//     if (error) {
//         return res.json({
//             status: 200,
//             message: 'validate user form update',
//             errors: validate.validateError(error)
//         })
//     }

//     next()
// }