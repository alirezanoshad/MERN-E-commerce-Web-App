const express = require('express');
const {redisClient} = require('../config/redisClient');
const cach = require('../middleware/cache')
const adminproductsRouter = express.Router();
const _ = require('lodash');
const Product = require('../models/Product');
const {protect,admin} = require('../middleware/authMiddleware');
// @route GET /api/admin/products
// @desc Get all products (admin only)
// @access Private/Admin
adminproductsRouter.get('/',protect,admin,cach,async(req,res)=>{
    try {
        const products = await Product.find({});
        // set in redis
        await redisClient.set('adminProducts',JSON.stringify(products),{EX:300})
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'server error'})
    }
})
module.exports = adminproductsRouter