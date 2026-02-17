const express = require('express');
const Cart = require('../models/cart');
const Product = require('../models/Product');
const {protect} = require('../middleware/authMiddleware');
const _ = require('lodash');
const cartRouter = express.Router();


// @route POST /api/cart
// @desc add a product to the cart for a guest or logged in user
// @access public
cartRouter.post('/',async(req,res)=>{
    // getting info from req.body
    const cartData = _.pick(req.body,['productID','quantity','size','color','guestID','userID']);
    try {
        const product = await Product.findById(cartData.productID);
        if(!product) return res.status(404).json({msg:'product not found'});
    } catch (error) {
        
    }
})



