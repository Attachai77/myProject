const DB = require('../config/db')
const bcrypt = require('bcrypt')
const _ = require('lodash')

const Auth = require('./AuthController')

exports.index = async (req,res) => {

    const users = await DB.from('users').select('*')
    return res.json({
        'status':200,
        'data':users
    })
}

exports.createUser = async (req,res) => {
    const { username , password ,name , age  } = req.body 
    
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
        username,
        password: passwordNew,
        name
    }
    if(age) data.age = age
    
    await DB.from('users').insert(data)
    return res.json({
        'success':true,
        'status':200
    })
}

exports.updateUser = async (req,res) => {
    const {name , age  } = req.body 
    const user_id = req.params.id

    const data = { name }
    if(age) data.age = age

    await DB.from('users').update(data).where('id' , user_id)

    return res.json({
        'status':200,
        'success':true
    })
}

exports.deleteUser = async (req,res) => {
    const id = req.params.id
    await DB.from('users').delete().where('id',id)
    return res.json({
        'status':200,
        'success':true
    })
}

exports.getUserById = async (req,res) => {
    const user_id = req.params.id
    const user = await DB.from('users').select('*').first().where({id:user_id})
    return res.json({
        'status':200,
        'data':user
    })
}
