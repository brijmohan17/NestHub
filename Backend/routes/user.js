const express=require('express')
const router=express.Router()
const User=require('../models/user.js')
const userController=require('../controllers/users.js')


const validatedUser=require('../middleware/validUser.js')
const wrapAsync = require('../utils/wrapAsync.js')
router.
    route('/signup')
    .post(validatedUser,userController.signup)

router.
    route('/login')
    .post(userController.login)

router.get('/logout',userController.logout)
module.exports=router;