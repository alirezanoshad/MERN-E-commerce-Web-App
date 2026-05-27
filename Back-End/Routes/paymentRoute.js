const express = require('express');
const paymentRouter = express.Router();
const _ = require('lodash');
const axios = require('axios');



// callback api
paymentRouter.get('/callback',async(req,res)=>{
    // just a api for callback test
    console.log('callback');
})



paymentRouter.post('/pay',async(req,res)=>{
    try {
        // distracting amount from body
    const amount = _.pick(req.body,["amount"]);
    const paymentData = {
        merchant_id:'',
        amount:amount.amount,
        description:'buy product',
        callback_url:"http://localhost:5000/api/payment/callback"
    };
    const response = await axios("https://sandbox.zarinpal.com/pg/v4/payment/request.json",paymentData);
    console.log(response.data);

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'server error'})
    }
    
    
})







module.exports = paymentRouter