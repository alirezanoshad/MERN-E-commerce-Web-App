// this file is for creating users and managing them by admin
const express = require('express');
const adminRouter = express.Router();
const _ = require('lodash');
const User = require('../models/UserScheama');
const {protect,admin} = require('../middleware/authMiddleware');
// @route GET /api/admin/users
// @desc Get all users (Admin only)
// @access Private/Admin
adminRouter.get('/',protect,admin,async(req,res)=>{
    try {
        // getting all users
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'server error'})
    }
});


// @route POST /api/admin/users
// @desc Add a new user (admin only)
// @access Private/Admin
adminRouter.post('/users',async(req,res)=>{
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
});


// @route PUT /api/admin/users/:id
// @desc update user info (admin only) - name, email and role
// @access Private/admin
adminRouter.put('/:id',protect,admin,async(req,res)=>{
    try {
        // find user by id from params and update
        const user = await User.findOneAndUpdate({_id:req.params.id},{$set:_.pick(req.body,["name","email","role"])},{new:true});
        if(!user){
            return res.status(404).json({msg:'user not found'});
        }else{
            res.status(200).json({msg:'user info updated successfully',user});
        }
       
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'server error'})
    }
})



// @route DELETE /api/admin/:id
// @desc delete user (admin only)
// @access Private/admin
adminRouter.delete('/:id',async(req,res)=>{
    try {
    // get user by id
    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({msg:'user not found'})
    }else{
        // delete user
        const deletedUser = await user.deleteOne();
        res.status(200).json({msg:'user deleted successfully',deletedUser});
    }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'server error'})
    }
})






module.exports = adminRouter

