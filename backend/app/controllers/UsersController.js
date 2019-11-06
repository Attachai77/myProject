const DB = require('../config/db')
const bcrypt = require('bcrypt')

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
    const passwordNew = bcrypt.hashSync(password , 10)
    await DB.from('users').insert({
        username,
        password: passwordNew,
        age,
        name
    })
    return res.json({
        'success':true,
        'status':200
    })
}

exports.updateUser = async (req,res) => {
    const {username, name , age  } = req.body 
    const user_id = req.params.id
    await DB.from('users').update({
        username,
        age,
        name
    }).where('id' , user_id)

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
