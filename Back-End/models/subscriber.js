const mongoose = require("mongoose");
// creating schema
const subscriberSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true,trim:true,lowercase:true},
    sebscribedAt:{type:Date,default:Date.now()},
});
module.exports = mongoose.model('Subscriber',subscriberSchema);