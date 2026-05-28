const express = require('express');
const paymentRouter = express.Router();
const _ = require('lodash');
const axios = require('axios');
const config = require("config");
const Payment = require('../models/payment');
const User = require('../models/User');


// callback api
paymentRouter.get('/callback',async(req,res)=>{
    try {
        if(req.query.status && req.query.status !== 'OK'){
            return res.json({msg:'payment failed'});
        }
        let payment = await Payment.findOne({resNumber:req.query.authority});
        if(!payment) return res.json({msg:'payment not found'});
        const paymentData = {
            merchant_id:config.get('gateway.merchant_id'),
            amount:payment.amount,
            authority:req.query.authority
        }
        const response = await axios.post(config.get('gateway.sandBoxVerify'),paymentData);
        if(response.data.code == '100'){
            let balance = payment.amount;
            let user = await User.findById(payment.user);
            if(user.balance){
                balance += user.balance;
            }
            user.balance = balance;
            payment.payment = true;
            await user.save();
            await payment.save();
            res.json({msg:'payment successful'});
        }else{
            res.json({msg:'payment failed'});
        }
    } catch (error) {
        
    }
})



paymentRouter.post('/pay',async(req,res)=>{
    try {
        // distracting amount from body
    const amount = _.pick(req.body,["amount"]);
    const paymentData = {
        merchant_id:config.get('gateway.merchant_id'),
        amount:amount.amount,
        description:'buy product',
        callback_url:config.get('gateway.callBackUrl')
    };
    const response = await axios.post(config.get('gateway.sandBox'),paymentData);
    res.status(200).json(response.data);
    // if(response.data.code == '100'){
        // creating new payment
        // const newPayment = new Payment({
        //     user:req.user.id,
        //     amount:amount.amount,
        //     resNumber:response.data.authority
        // })
        // await newPayment.save();
        // redirecting user
        // res.redirect(config.get(`gateway.redirectUrl ${response.data.authority}`));
        // console.log(config.get(`gateway.redirectUrl ${response.data.authority}`));
    // }

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'server error'})
    }
    
    
})







module.exports = paymentRouter