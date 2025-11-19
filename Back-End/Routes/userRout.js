// this file contains user routes & imported in index.js

// importing express
const express = require("express");
// importing user Model
const User = require("../models/UserScheama");
// importing jwt
const jwt = require("jsonwebtoken");
// importing lodash
const _ = require("lodash");
// creating router
const router = express.Router();
// @route POST /api/users/register
router.post('/register',async(req,res)=>{
    // extracting name/email/password from request body
    const userData = _.pick(req.body,["name","email","password"]);
    try {
        let user = await User.findOne({email:userData.email});
        if(user) return res.status(400).json({msg:"User already exists"});
        user = new User(userData);
        await user.save();
        res.status(200).json({msg:"User created successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
})

module.exports = router








