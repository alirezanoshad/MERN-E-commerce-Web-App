const express = require('express');
const _ = require('lodash');
const subscriberRouter = express.Router();
const Subscriber = require('../models/subscriber');
// @route POST /api/subscribe
// @desc Handle newsletter subscription
// @access Public
subscriberRouter.post('/subscribe',async(req,res)=>{
    // getting email from body
    const subsEmail = _.pick(req.body,["email"]);
    // check if email is present
    if(!email) return res.status(400).json({msg:"Email is required"});
    try {
        // check if email is already subscribed
        let subscriber = await Subscriber.findOne({email:subsEmail.email});
        if(subscriber){
            return res.status(400).json({msg:'email is already subscribed'})
        }
        // create new subscriber
        subscriber = new Subscriber(subsEmail.email);
        await subscriber.save();
        res.status(201).json({msg:'successfully subscribed to the newsletter'});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'server error'})
    }
})




module.exports = subscriberRouter