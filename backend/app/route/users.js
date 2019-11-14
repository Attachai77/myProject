const express = require('express');
const UsersController = require('../controllers/UsersController')
const router = express.Router();
const verifyToken = require('../controllers/AuthController').verifyToken()
const UserValidate = require('../controllers/validate/users')

router.get('/', UsersController.index);
router.get('/index', UsersController.index);
router.post('/createUser', UserValidate.createUser() ,UsersController.createUser);
router.patch('/updateUser/:id', verifyToken, UsersController.updateUser);
router.delete('/deleteUser/:id', verifyToken, UsersController.deleteUser);
router.get('/getUserById/:id', verifyToken, UsersController.getUserById);

module.exports = router