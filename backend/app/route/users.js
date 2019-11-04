const express = require('express');
const UsersController = require('../controllers/UsersController')
const router = express.Router();

router.get('/', UsersController.index);
router.get('/index', UsersController.index);
router.post('/createUser', UsersController.createUser);
router.patch('/updateUser/:id', UsersController.updateUser);
router.delete('/deleteUser/:id', UsersController.deleteUser);
router.get('/getUserById/:id', UsersController.getUserById);

module.exports = router