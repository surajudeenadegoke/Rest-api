const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const  jwt  = require('jsonwebtoken');
const  User   =  require('../models/userModel');

// @desc POST
// @route POST/api/users
// @access public
const registerUser = asyncHandler (async ( req,res ) =>{
    const { name, email, password } = req.body;
    if( !name || !email || !password ){
        res.status(404);
        throw new Error('please enter all required fields');
    }
// check if user already exists
   const userExist = await User.findOne({ email});
   if( userExist ){
       res.status(400)
       throw new Error('user already exists');
   }
   //hash the password
   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(password, salt);
   //create a new user

   const user = await User.create({
       name,
       email,
       password : hashedPassword

   })
   // check if new user was created

   if(user){
       res.status(201).json({
           _id : user._id,
           name : user.name,
           email : user.email,
           password : user.password,
           token : generateToken(user._id)

       })
   }else{
       res.status(404)
       throw new Error('Something went wrong')
   }


}) 


// @desc authenticate user
// @route POST/api/users/login
// @access public
const loginUser = asyncHandler ( async (req,res ) =>{

    const { email, password} = req.body;
    //check if user exists
    const user =  await User.findOne({ email})
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user._id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id)
        })
    }else{
        res.status(403)
        throw new Error(`Invalid password or email`)
    }
   
})
// @desc get user data
// @route POST/api/users/:id
// @access public
const getUserById = ( req,res ) => {
    res.json({ message : `get user with id: ${req.params.id}` })
}

//generate token
const generateToken = (id ) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "2h"
    })
}




module.exports = {
    registerUser,
    loginUser,
    getUserById

}