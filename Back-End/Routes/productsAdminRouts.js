const express = require('express');
const adminproductsRouter = express.Router();
const _ = require('lodash');
const Product = require('../models/Product');
const {protect,admin} = require('../middleware/authMiddleware');


// @route GET /api/admin/products
// @desc Get all products (admin only)
// @access Private/Admin
adminproductsRouter.get('/',async(req,res)=>{
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'server error'})
    }
})








module.exports = adminproductsRouter