const mongoose = require('mongoose');
const orderItemSchema = new mongoose.Schema({
    productID:{type:mongoose.Schema.ObjectId,ref:'Product',required:true},
    name:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true},
    size:String,
    color:String,
    quantity:{type:Number,required:true}
},{_id:false});
const orderSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.ObjectId,ref:'User',required:true},
    orderItems:[orderItemSchema],
    shippingAddress:{
        firstName:{type:String,required:true},
        lastName:{type:String,required:true},
        phoneNumber:{type:String,required:true},
        address:{type:String,required:true},
        city:{type:String,required:true},
        postalCode:{type:String,required:true},
        country:{type:String,required:true}
    },
    totalPrice:{type:Number,required:true},
    paidAt:{type:Date},
    isDelivered:{type:Boolean,default:false},
    deliveredAt:{type:Date},
    paymentStatus:{type:String,default:'pending'},
    resNumber:{type:String}
},{timestamps:true});
module.exports = mongoose.model('Order',orderSchema);