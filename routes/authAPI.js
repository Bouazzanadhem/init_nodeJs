const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

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
        if(validPassword){
            res.status(200).json({message: 'Valid Password'});
        }else{
            res.status(400).json({message: 'Invalid Password'});
        }
    }else{
        res.status(400).json({message: "E-mail don't Exist !"});
    }
    // res.json({message: 'Login successfully !'});
});




module.exports = router;