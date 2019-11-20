const DB = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const multer  = require('multer');
const path = require('path');
const fs = require('fs');

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
    const {  firstname, lastname, username , password, email, birthdate , gendar   } = req.body 
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

exports.uploadFile = () => async (req , res , next ) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            // cb(null, 'uploads')
            cb(null, './uploads/img')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname) )
        }
    })

    let upload = multer({ storage: storage, fileFilter: imageFilter }).single('file');

    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        console.log(req.file);
        
        const baseUrl = req.protocol + '://' + req.get('host');
        // Display uploaded image for user validation
        // res.send(`You have uploaded this image: <hr/><img src="${baseUrl}/${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
        res.send({
            uploadSuccess: true, 
            img_path: `${baseUrl}/img/${req.file.filename}`,
            file: req.file
        });
    });
}

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
}