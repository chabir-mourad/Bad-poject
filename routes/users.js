const express = require('express');

const router = express.Router()

 const bcrypt = require('bcryptjs');

const User = require('../models/User')

const {check, validationResult } = require('express-validator')

const jwt = require('jsonwebtoken')

const config = require('config')

const gravatar = require('gravatar')












// @route  /register
//@desc   Get the user Data
// @access  Public

router.post('/register' , [
    //check Username 
    check('name' , "Name is Required").not().isEmpty().isLength({min:3}).withMessage('Name must have 3 characteres or more'),
    
    //check Email
    check('email' , "Please include a Valid email").isEmail(),
    //check Password length
    check('password' , "Please enter a Password with 6 characteres or more").isLength({min : 6}).matches(/\d/).withMessage('Password must contain a number'),
    //check Adress
    check('adress' , "adress is Required").not().isEmpty(),
    //check ZipCode
    check('zipCode' , "zip Code is Required").not().isEmpty(),
    //check Phone Number
    check('phoneNumber' , "phoneNumber is Required").not().isEmpty()
]  , async(req,res)=> {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array()})
    }

    const {email , password , name ,adress , zipCode , phoneNumber} = req.body

try {
    let user = await User.findOne({email:email})

    if (user) {
        return    res.status(400).json({errors : [message = "Email is already exists"]})
        }


// Get user gravatar 
const avatar = gravatar.url(email , {
    s :'200' , 
    r : 'pg' , 
    d:'mm'
})



// Get all the user data After validation
user = new User ({
    name , 
    email , 
 avatar , 
password ,
adress ,
zipCode ,
phoneNumber
})


// Haash & Salt the password


const salt = await  bcrypt.genSalt(10)

user.password = await bcrypt.hash(password, salt)


// Save The user 
 user.save()


const payload = {
    user : {
        id : user.id
    }

}

jwt.sign(payload,config.get('jwtSecret') , {expiresIn : 460000} , function(err,token) {
    if (err) {console.log(err)}
    else {
        res.json({token})
    }
    
})


} catch (err) {


console.error(err.message);
res.status(500).send('Server is out')

}
})



// @route  /users
//@desc   Get All of the Users 
// @access  Private


router.get('/' , async(req,res)=> {


    try {

 const users =   await User.find() 

res.json(users)
        
    } catch (err) {
        console.error(err);
res.status(500).send('Server is out')
        
    }




})




module.exports = router