const express = require('express');
const paymentRouter = express.Router();
const _ = require('lodash');
const axios = require('axios');
const config = require("config");
const Payment = require('../models/payment');
const User = require('../models/UserScheama');
const Order = require('../models/order');
const Cart = require('../models/cart');
const { protect } = require('../middleware/authMiddleware');
const cors = require("cors");
const app = express();
app.use(cors());
// callback api
paymentRouter.get('/callback',async(req,res)=>{
    try {
        if(req.query.Status && req.query.Status !== 'OK'){
            let payment = await Payment.findOne({resNumber:req.query.Authority});
            let order = await Order.findById(payment.order);
            payment.payment = false;
            order.paymentStatus = 'faild';
            order.status = 'Cancelled';
            await order.save();
            await payment.save();
            return res.redirect(`http://localhost:5173/order-confirmation/${order._id}`);
        }
        let payment = await Payment.findOne({resNumber:req.query.Authority});
        if(!payment) return res.json({msg:'payment not found'});
        const paymentData = {
            merchant_id:config.get('gateway.merchant_id'),
            amount:payment.amount,
            authority:req.query.Authority
        }
        const response = await axios.post(config.get('gateway.sandBoxVerify'),paymentData);
        if(response.data.data.code === 100){
            let order = await Order.findById(payment.order);
            order.paymentStatus = 'paid';
            order.resNumber = req.query.Authority;
            payment.payment = true;
            await order.save();
            await payment.save();
            res.redirect(`http://localhost:5173/order-confirmation/${order._id}`);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'server error'})
    }
})
// @route POST /api/payment
paymentRouter.post('/paymentAsli',protect,async(req,res)=>{
    try {
    const cartInfo = _.pick(req.body,['cartData','shippingAddress']);
    const savedOrder = await Order.create({
        user:req.user._id,
        shippingAddress:cartInfo.shippingAddress,
        orderItems:cartInfo.cartData.products,
        totalPrice:cartInfo.cartData.totalPrice,
    });
    // pay >>> getting total price
    const amount = cartInfo.cartData.totalPrice;
    const paymentData = {
        merchant_id:config.get('gateway.merchant_id'),
        amount:amount,
        currency:'IRT',
        description:'buy product',
        callback_url:config.get('gateway.callBackUrl')
    };
    const response = await axios.post(config.get('gateway.sandBox'),paymentData);
     if(response.data.data.code == 100){
        // creating new payment
        const newPayment = await Payment.create({
            user:req.user.id,
            amount:amount,
            resNumber:response.data.data.authority,
            order:savedOrder._id
        });
        // deleting cart
        await Cart.findOneAndDelete({user:req.user._id});
        // redirecting user
        res.status(200).json({authority:response.data.data.authority});
    }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'server error'})
    }
    
    
})
module.exports = paymentRouter