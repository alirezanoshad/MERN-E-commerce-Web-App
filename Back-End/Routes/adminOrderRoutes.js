const express = require('express');
const adminOrderRouter = express.Router();
const _ = require('lodash');
const Order = require('../models/order');
const {protect,admin} = require('../middleware/authMiddleware');



// @route GET /api/admin/orders
// @desc GET all orders (admin only)
// @access Private/Admin
adminOrderRouter.get('/',async(req,res)=>{
    try {
        const orders = await Order.find({}).populate('user','name email');
        res.status(200).json(orders);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'server error'});
    }
})










module.exports = adminOrderRouter