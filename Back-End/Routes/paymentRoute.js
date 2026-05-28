const express = require('express');
const paymentRouter = express.Router();
const _ = require('lodash');
const axios = require('axios');
const config = require("config");


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
        merchant_id:config.get('gateway.merchentId'),
        amount:amount.amount,
        description:'buy product',
        callback_url:config.get('gateway.callBackUrl')
    };
    const response = await axios(config.get('gateway.sandBox'),paymentData);
    console.log(response.data);

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'server error'})
    }
    
    
})







module.exports = paymentRouter