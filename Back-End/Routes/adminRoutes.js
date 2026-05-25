// this file is for creating users and managing them by admin
const express = require('express');
const adminRouter = express.Router();
const _ = require('lodash');
const User = require('../models/UserScheama');
const {protect,admin} = require('../middleware/authMiddleware');
// @route GET /api/admin/users
// @desc Get all users (Admin only)
// @access Private/Admin
adminRouter.get('/',protect,admin,async(req,res=>{
    try {
        // getting all users
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'server error'})
    }
}));


// @route POST /api/admin/users
// @desc Add a new user (admin only)
// @access Private/Admin
adminRouter.post('/users',protect,admin,async(req,res)=>{
    // getting new users data from body of the request
    let userData = _.pick(req.body,["name","email","password","role"]);
    try {
        // check if there is a user with same email
        let user = await User.findOne({email:userData.email});
        if(user){return res.status(400).json({msg:'user is already exists'})};
        user = new User(userData);
        await user.save();
        res.status(201).json({msg:'user created successfully',user});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'server error'})
    }
})






module.exports = adminRouter

