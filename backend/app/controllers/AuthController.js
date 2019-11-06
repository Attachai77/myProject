const DB = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async (req,res) => {
    const { username , password } = req.body
    const user  = await DB.from('users').select('*').where('username', username).first()

    if(!user){
        return res.json({
            status: 200,
            message: "Incorect username or password"
        })
    }

    const compare = bcrypt.compareSync(password, user.password)
    if (!compare) {
        return res.json({
            status: 401,
            message: "Incorect username or password"
        }).status(401)
    }

    req.token = jwt.sign( {
        userId: user.id
    },
    'UvFZNbUaEMUjTAFPwGAsQ8zwR8M2LrNm'
    ,{
        expiresIn:'1d'
    })

    delete user.password

    res.json({
        sucess:true,
        status:200,
        message:'login success.',
        token: req.token,
        user:user
    })
}

exports.verifyToken = () => async (req , res , next ) => {
    const { token } = req.headers
    jwt.verify(token , 'UvFZNbUaEMUjTAFPwGAsQ8zwR8M2LrNm' , (err, decode) => {
        if (err) {
            res.json({
                status:401,
                message:"token invalid or token expired"
            })
        }else{
            res.userId = decode.userId
            next()
        }
    })
}