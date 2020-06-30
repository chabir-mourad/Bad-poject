const express = require('express');
const router = express.Router()
const auth = require('../middlware/auth')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check , validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')




// @route  GET   login/auth
//@desc   Test routes
// @access  Public



router.get('/auth', auth , async(req,res)=> {
  
    try {
        const user = await User.findById(req.user.id).select('-passwword')
        res.json(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')

        
    }
})



// @route  Post   /login/auth
//@desc  Authenticate user & get  token
// @access  Public


router.post('/auth' , [
   
    check('email' , "Please include a Valid email").isEmail(),
    check('password' , "Password  is Required").exists()
] , async (req,res) => {


    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array()})
    }

    const {email , password } = req.body

try {
let user = await User.findOne({email})

// Check the user Email
if (!user) {
return    res.status(400).json({errors : [msg = "Invalid Email"]})
}

// Check the user Passwword

 const isMatch = await  bcrypt.compare(password , user.password)


 if (!isMatch) {
    return    res.status(400).json({errors : [msg = "Invalid Password"]})
 }

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




}catch (err) {
    console.error(err.message);
    res.status(500).send("Server is out")
    
}
  
})




module.exports = router 