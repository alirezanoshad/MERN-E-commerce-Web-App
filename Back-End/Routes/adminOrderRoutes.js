const express = require('express');
const adminOrderRouter = express.Router();
const _ = require('lodash');
const Order = require('../models/order');
const {protect,admin} = require('../middleware/authMiddleware');
const { findById } = require('../models/UserScheama');



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



// @route PUT /api/admin/orders/:id
// @desc update order status (admin only)
// @access Private/Admin
adminOrderRouter.put('/:id',async(req,res)=>{
    try {
        // finfing user by its ID
        const user = await findById(req.params.id);
    } catch (error) {
        
    }
})










module.exports = adminOrderRouter