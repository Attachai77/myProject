const express = require('express');
const AuthController = require('../controllers/AuthController')
const router = express.Router();
const validate = require('../controllers/validate/auth')

router.post('/login', AuthController.login);
router.post('/register',  AuthController.register);
// router.post('/register', validate.Register(), AuthController.register);

module.exports = router