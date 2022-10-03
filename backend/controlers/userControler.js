const asyncHandler = require('express-async-handler')
const User = require('../models/userModal');
const genrateToten = require('../utils/genrateToken');

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;
    const isUserExist = await User.findOne({ email })

    if (isUserExist) {
        res.status(400);
        throw new Error('User already exist')
    }
    const user = await User.create({
        name,
        email,
        password,
        pic
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            pic:user.pic,
            token:genrateToten(user._id)
        })
    }
    else{
        res.status(400);
        throw new Error('Error Occured')
    }
})

const authUser = asyncHandler(async (req, res) => {
    const { password, email } = req.body;
    const user = await User.findOne({email});
    //console.log("aa", genrateToten(user._id))
    // if(user && (await user.matchPassword(password))){
        if(user){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            pic:user.pic,
            token:genrateToten(user._id)
        })
    }
    else{
        res.status(400);
        throw new Error('Invaid email or password!') 
    }
   
})
module.exports = { registerUser, authUser }