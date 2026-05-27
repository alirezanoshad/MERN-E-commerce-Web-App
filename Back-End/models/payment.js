// this file is for payments schema
const mongoose = require("mongoose");
const timestamp = require('mongoose-timestamp');
const paymentSchema = new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    resNumber:{type:String,required:true},
    amount:{type:Number,required:true},
    payment:{type:Boolean,default:false}
});


module.exports = mongoose.model("Payment",paymentSchema);