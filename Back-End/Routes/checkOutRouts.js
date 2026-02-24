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







module.exports = checkOutRouter