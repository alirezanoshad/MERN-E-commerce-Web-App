// importing packages
// 1-express
const express = require('express');
// 2-order Model
const Order = require('../models/order');
// 3- protect Middleware
const {protect} = require('../middleware/authMiddleware');
// 4- initialize router 
const orderRouter = express.Router();
// @route GET/api/orders/my-orders
// @desc get logged in users orders
// @access Private
orderRouter.get('/my-orders',protect,async(req,res)=>{
    try {
        // fetch all users in the currently user data
        const orders = await Order.find({user:req.user._id}).sort({createdAt:-1});   // sort by most recent
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'server error'});
    }
})
// @route GET /api/order/:id
// @desc users can get order detail by ID
// @access Private
orderRouter.get('/:id',protect,async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id).populate('user','name email');
        if(!order){
            return res.status(404).json({msg:'Order not found'})
        }
        // return the full order detail
        res.json(order)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'server error'});
    }
})
module.exports = orderRouter