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
        address:{type:string,required:true},
        city:{type:string,required:true},
        postalCode:{type:string,required:true},
        country:{type:string,required:true}
    },
    paymentMethod:{type:String,required:true},
    totalPrice:{type:Number,required:true},
    isPaid:{type:Boolean,default:false},
    paidAt:{type:Date},
    isDelivered:{type:Boolean,default:false},
    deliveredAt:{type:Date},
    paymentStatus:{type:string,default:'pending'},
    status:{tyoe:String,enum:['Processing','Shipped','Delivered','Cancelled'],default:'Processing'},

},{timestamps:true});

module.exports = mongoose.model('Order',orderSchema);