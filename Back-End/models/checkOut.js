// imoirting mongoose
const mongoose =require('mongoose');
// defining check out item schema
const checkOutItemSchema = new mongoose.Schema({
    productID:{type:mongoose.Schema.ObjectId,ref:'Product',required:true},
    name:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true}
},{_id:false});

const checkOutSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.ObjectId,ref:'User',required:true},
    checkOutItems : [checkOutItemSchema],
    shippingAddress:{
        address:{type:String,required:true},
        city:{type:String,required:true},
        postalCode:{type:String,required:true},
        country:{type:String,required:true}
    },
    paymentMethod:{type:String,required:true},
    totalPrice:{type:Number,required:true},
    isPaid:{type:Boolean,default:false},
    paidAt:{type:Date},
    paymentStatus:{type:String,default:'pending'},
    paymentDetails:{type:mongoose.Schema.Types.Mixed}, // cause payment related details (transactions ID,paypal response)
    isFinalized:{type:Boolean,default:false},
    finalizedAt:{type:Date}
},{timestamps:true})

module.exports = mongoose.model('CheckOut',checkOutSchema);