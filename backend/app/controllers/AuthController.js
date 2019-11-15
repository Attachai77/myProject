const DB = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

exports.login = async (req,res) => {
    const { username , password } = req.body
    const user  = await DB.from('users').select('*').where('username', username).first()
    if(!user){
        res.status(401)
        return res.json({
            sucess:false,
            status: 200,
            message: "Incorect username or password"
        })
    }

    const compare = bcrypt.compareSync(password, user.password)
    if (!compare) {
        res.status(401)
        return res.json({
            sucess:false,
            status: 401,
            message: "Incorect username or password"
        })
    }

    req.token = jwt.sign( { userId: user.id },  'UvFZNbUaEMUjTAFPwGAsQ8zwR8M2LrNm',{    expiresIn:'1d'  })
    delete user.password

    res.json({
        sucess:true,
        status:200,
        message:'login success.',
        token: req.token,
        user: {
            id: user.id,
            fullname: user.name
        }
    })
}

exports.register = async (req,res) => {
    const {  firstname, lastname, username , password, email, birthdate , gendar , profile_img  } = req.body 
    const user = await DB.from('users').select('*').where('username', username)
    
    if(!_.isEmpty(user)){
        return res.json({
            'success':false,
            'status':200,
            'message': 'Username already taken. '
        })
    }

    const passwordNew = bcrypt.hashSync(password , 10)
    const data = {
        firstname,  lastname,    username,
        password: passwordNew, email, 
        gendar
    }

    if (birthdate) data.birthdate = birthdate
    
    let new_user
    try {
        new_user =  await DB.from('users').insert(data).returning('*')
    } catch (error) {
        throw error
    }

    const token = jwt.sign( { userId: new_user[0].id },  'UvFZNbUaEMUjTAFPwGAsQ8zwR8M2LrNm',{    expiresIn:'1d'  })
    return res.json({
        success:true,
        status:200,
        message:'Register success.',
        token: token,
        user: {
            id: new_user[0].id,
            fullname: new_user[0].firstname + " " + new_user[0].lastname
        }
    })
}

exports.verifyToken = () => async (req , res , next ) => {
    const { token } = req.headers
    
    jwt.verify(token , 'UvFZNbUaEMUjTAFPwGAsQ8zwR8M2LrNm' , (err, decode) => {
        if (err) {
            res.status(401)
            .json({
                status:401,
                message:"token invalid or token expired"
            })
        }else{
            res.userId = decode.userId
            next()
        }
    })
}