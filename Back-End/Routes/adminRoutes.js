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
}))






module.exports = adminRouter

