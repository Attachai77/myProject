const DB = require('../config/db')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const setupPaginator = require('knex-paginator');
setupPaginator(DB);

const Auth = require('./AuthController')

exports.index = async (req,res) => {
    console.log(req.query);
    const current_page = req.query.current_page? req.query.current_page : 1
    const per_page = req.query.per_page? req.query.per_page : 2

    const users = await DB.from('users')
        .select('id','firstname','lastname','username','birthdate','gendar','email', DB.raw("CONCAT(firstname, ' ', lastname) AS fullname ") )
        .paginate(per_page, current_page, true)
        // .then(paginator => {
        //     console.log(paginator.current_page);
        //     console.log(paginator.per_page);
        //     console.log(paginator.total);
        //     console.log(paginator.last_page);
        //     console.log(paginator.data);
        //     return paginator.data
        // });

    // console.log(users);
    
    return res.json({
        status:200,
        data:users
    })
}

exports.createUser = async (req,res) => {
    const { username , password   } = req.body 
    
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
        password: passwordNew
    }
    
    await DB.from('users').insert(data)
    return res.json({
        'success':true,
        'status':200
    })
}

exports.updateUser = async (req,res) => {
    const {firstname, lastname, email, gendar, birthdate } = req.body 
    const user_id = req.params.id

    const data = { firstname, lastname, email, gendar }
    if(birthdate) data.birthdate = birthdate

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
        'success':true,
        'message':'User has been deleted'
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
