const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const User = require('../models/user');

// Register
router.post('/register',async(req,res)=>{
    const userFound = await User.findOne({email: req.body.email})
    if (userFound == null){
        // hashage Password
        bcrypt.hash(req.body.password, 10, async(error, hash)=> {
            if (error){
                res.status(500).json({message: 'Server error ! '});
                
            }
            // Store hash in your password DB.
            req.body.password = hash;
            await User.create(req.body);
            res.json({message: 'Register seccessfully !'});
        });
        
    }else{
        res.status(400).json({message: 'E-mail Exist !'});
    }
    
});

// Login
router.post('/login',async(req, res)=>{
    const loginUser = await User.findOne({email:req.body.email});
    if (loginUser != null) {
        const validPassword = await bcrypt.compare(req.body.password, loginUser.password);
        // console.log(validPassword);
        if(validPassword){
            // create a token
            const tokenData = {
                firstName: loginUser.firstName,
                userId: loginUser._id
            };
            const createdToken = jwt.sign(tokenData, process.env.JWT_SECRET,{expiresIn: process.env.EXPIRE});
            res.status(200).json({message: 'Login successfully', token: createdToken});
        }else{
            res.status(400).json({message: 'Please verify your E-mail or Password'});
        }
    }else{
        res.status(400).json({message: 'Please verify your E-mail or Password'});
    }
});




module.exports = router;