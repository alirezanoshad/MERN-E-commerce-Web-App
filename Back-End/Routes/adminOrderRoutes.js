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
// @route PUT /api/admin/orders/:id
// @desc update order status (admin only)
// @access Private/Admin
adminOrderRouter.put('/:id',admin,async(req,res)=>{
    try {
        // finding user by its ID
        const order = await Order.findById(req.params.id).populate("user","name");
        if(order){
            order.status = req.body.status || order.status;
            order.deliveredAt = req.body.status === 'Delivered' ? Date.now() : order.deliveredAt;
            const updatedOrder = await order.save();
            res.status(200).json(updatedOrder);
        }else{
            res.status(404).json({msg:'order not found'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'server error'});
    }
})
// @route DELETE /api/admin/orders/:id
// @desc delete order (admin only)
// @access Private/Admin
adminOrderRouter.delete('/:id',admin,async(req,res)=>{
    try {
        // getting order by its ID and deleting it
        const order = await Order.findById(req.params.id);
        if(order){
            await order.deleteOne();
            res.status(200).json({msg:'order deleted successfully'});
        }else{
            res.status(404).json({msg:'order not found'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'server error'});
    }
})
module.exports = adminOrderRouter