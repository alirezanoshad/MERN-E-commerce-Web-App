// this file contains user routes & imported in index.js
// importing config
const config = require("config");
// importing express
const express = require("express");
// importing user Model
const User = require("../models/UserScheama");
// importing jwt
const jwt = require("jsonwebtoken");
// importing lodash
const _ = require("lodash");
// importing protect middleware
const {protect} = require('../middleware/authMiddleware');
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
        // create JWT payload
        const payload = {user:{id:user._id,role:user.role}};
        // sign JWT
        jwt.sign(payload,config.get("server.JWT_SECRET"),{expiresIn:"1d"},(err,token)=>{
            if(err) throw err;
            res.status(200).json({
                user:{
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role
                },
                token
            });
        })
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});
// @route POST/api/users/login
// @desc Authenticate user
// @access Public
router.post('/login',async(req,res)=>{
    const loginedUser = _.pick(req.body,["email","password"]);
    try {
        // finding user by Email
        // first creating a user variable to store the users data
        let user = await User.findOne({email:loginedUser.email});
        // if user not found
        if(!user) return res.status(400).json({msg:"User not found"});
        // matching password
        const isMatch = await user.matchPassword(loginedUser.password);
        if(!isMatch) return res.status(400).json({msg:"Invalid Password"});
        //create JWT payload
        const payload = {user:{id:user._id,role:user.role}};
        // sign JWT
        jwt.sign(payload,config.get("server.JWT_SECRET"),{expiresIn:"1d"},(err,token)=>{
            if(err) throw err;
            res.json({
                user:{
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role
                },
                token
            })
        })
        

    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});
// @route GET/api/users/profile
// @desc GET logged-in user's profile (Protected Route)
// @access Private
router.get('/profile',protect,async(req,res)=>{
    res.json(req.user)
});
module.exports = router