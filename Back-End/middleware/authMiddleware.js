// this middleware will protect user routs
// importing JWT
const jwt = require('jsonwebtoken');
// importing User modle
const User = require('../models/UserScheama');
// importing config
const config = require('config')
// Middleware to protect routes
const protect = async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,config.get("server.JWT_SECRET"));
            req.user = await User.findById(decoded.user.id).select('-password');
            next();
        } catch (error) {
            console.error('Token verification failed',error);
            res.status(401).json({msg:'Not authorized,token failed'})
        }
    } else{
        res.status(401).json({msg:'no token provided'})
    }
}
// this middleware check is the user is admin
const admin = (req,res,next)=>{
    if(req.user && req.user.role ==="admin"){
        next();
    }else{
        res.status(404).json({message:"User is not admin"});
    }
}
module.exports = {protect,admin}