const express = require('express');
const router = express.Router();

const userRoute = require('./users')
const authRoute = require('./auth')


router.use('/auth', authRoute);
router.use('/users', userRoute);


module.exports = router