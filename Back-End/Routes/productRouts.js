// exporting important modules
const express = require('express');
const Product = require('../models/Product');
// also the protect middleware
const protect = require('../middleware/authMiddleware');
// new Rout
const router = express.Router();

// @route POST /api/products
// @desc create new product in DB
// @access private/Admin

router.post('/',protect,async (req,res)=>{
    try {
        // getting product data from req.body
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku
        } = req.body
    } catch (error) {
        
    }
})