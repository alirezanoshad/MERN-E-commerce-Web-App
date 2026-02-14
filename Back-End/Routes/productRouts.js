// exporting important modules
const express = require('express');
const Product = require('../models/Product');
// also the protect middleware
const {protect,admin} = require('../middleware/authMiddleware');


// new Rout
const prodRouter = express.Router();

// @route POST /api/products
// @desc create new product in DB
// @access private/Admin

prodRouter.post('/',
    protect,
    admin,
    async (req,res)=>{
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
        } = req.body;
        // putting new data in product const
        const product = new Product({name,
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
            sku,
            user:req.user._id // refer to the admin user who created the product
        });

        // saving product in DB
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');

    }
})

module.exports = prodRouter;