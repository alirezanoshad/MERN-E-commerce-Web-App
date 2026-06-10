// creating UserSchema
const mongoose = require("mongoose");
// importing bcrypt
const bcrypt = require("bcrypt");
const { trim, uniq } = require("lodash");
// importing timestamp
const timestamp = require('mongoose-timestamp');
// defining UserScheama
const userSchema = new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,unique:true,trim:true},
    password:{type:String,required:true},
    role:{type:String,enum:["customer","admin"],default:"customer"},
});
userSchema.plugin(timestamp);
// bcrypt password middleware
userSchema.pre("save",async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});
// match password
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
module.exports = mongoose.model("User",userSchema);