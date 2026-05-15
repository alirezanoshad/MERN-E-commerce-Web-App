const express = require('express');
const CheckOut = require('../models/checkOut');
const Cart = require('../models/cart');
const Product = require('../models/Product');
const Order = require('../models/order');
// importing protect middleware
const {protect} = require('../middleware/authMiddleware');
const checkOutRouter = express.Router();
const _ = require('lodash')

// @route POST/api/checkOut
// @desc create a new checkout session
// @access private
checkOutRouter.post('/',async(req,res)=>{
    // first getting data we need from req.body
    const checkOutData = _.pick(req.body,['checkOutItems','shippingAddress','paymentMethod','totalPrice']);
    // validation if any item in the checkout
    if(!checkOutData.checkOutItems || checkOutData.checkOutItems === 0){
        return res.status(400).json({msg:'no items in checkout'})
    }
    try {
        // create a new checkout session
        const newCheckOut = await CheckOut.create({
            user:req.user._id,
            checkOutItems:checkOutData.checkOutItems,
            shippingAddress:checkOutData.shippingAddress,
            paymentMethod:checkOutData.paymentMethod,
            totalPrice:checkOutData.totalPrice,
            paymentStatus:'Pending',
            isPaid:false
        });
        console.log(`checkout created for user:${req.user._id}`);
        res.status(201).json(newCheckOut);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error')
    }
})

// @route PUT /api/checkout/:id/pay
// @desc Update checkout to mark as paid after successful payment
// @access Private
checkOutRouter.put('/',protect,async(req,res) => {
    const checkOutData = _.pick(req.body,['paymentStatus','paymentDetails']);
    try {
        const checkout = await CheckOut.findById(req.params.id);
        if(!checkout){
            return res.status(404).json({mag:'checkout not found'})
        }
        if(checkOutData.paymentStatus === 'paid'){
            checkout.isPaid = true;
            checkout.paymentStatus = checkOutData.paymentStatus;
            checkout.paymentDetails = checkOutData.paymentDetails;
            checkout.paidAt = Date.now();
            await checkout.save();
            res.status(200).json(checkout);
        }else{
            res.status(400).json({msg:'invalid payment status'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'server error'});
    }
});



// @route POST /api/checkout/:id/finalize
// @decs finalize checkout and convert to an order after payment confirmation
// @access Privte
checkOutRouter.post('/:id/finalize',protect,async(req,res)=>{
    try {
        //retrieve checkout
        const checkout = await CheckOut.findById(req.params.id);
        if(!checkout){
            return res.status(404).json({msg:'chechout not found'})
        }
        if(checkout.isPaid && checkout.isFinalized){
            
        }
    } catch (error) {
        
    }
})







module.exports = checkOutRouter