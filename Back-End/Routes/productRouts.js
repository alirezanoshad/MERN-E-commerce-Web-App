// exporting important modules
const express = require('express');
const Product = require('../models/Product');
// also the protect middleware
const {protect,admin} = require('../middleware/authMiddleware');
// lodash
const _ = require('lodash');

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

// updating a product
// @route PUT/api/product/:id
// @desc updating an existing product by its ID
// access private /admin
prodRouter.put('/:id',protect,admin,async(req,res)=>{
    try {
        const updatedProd = _.pick(req.body,['name',
            'description',
            'price',
            'discountPrice',
            'countInStock',
            'category',
            'brand',
            'sizes',
            'colors',
            'collections',
            'material',
            'gender',
            'images',
            'isFeatured',
            'isPublished',
            'tags',
            'dimensions',
            'weight',
            'sku']);
        // find product using ID
        const existedProduct = await Product.findOneAndUpdate({_id:req.params.id},updatedProd,{new:true});
        if(!existedProduct){
            res.status(404).json({msg:'product does not exists'});
        }
        res.json(existedProduct);
       
    } catch (error) {
        console.log(error);
        res.status(500).send("server error");
    }
})

// deleting a product
// @route DELETE/api/products/:id
// @desc delete a product from DB by ID
// access private/admin
prodRouter.delete("/:id",protect,admin,async(req,res)=>{
    try {
        // find the product using id 
        const existedProduct = await Product.findOneAndDelete({_id:req.params.id});
        if(!existedProduct){
            res.status(403).json({msg:'product does not found'})
        }
        res.json({msg:'product removed',prod:existedProduct})
    } catch (error) {
        console.log(error);
        res.send('server error')
    }
});

// @route GET /api/products
// @desc Get all products with optional query and filters
// access public
prodRouter.get('/',async(req,res)=>{
    try {
        // options that users can select how get products
        const {collection,size,color,gender,minPrice,maxPrice,sortBy,search,category,material,brand,limit} =req.query;
        let query = {};
        // filter logic
        if(collection && collection.toLocaleLowerCase() !== 'all'){
            query.collections = collection;
        }
        if(category && category.toLocaleLowerCase() !== 'all'){
            query.category = category;
        }
        if(material){
            query.material = {$in:material.split(',')};
        }
        if(brand){
            query.brand = {$in:brand.split(',')};
        }
        if(size){
            query.sizes = {$in:size.split(',')};
        }
        if(color){
            query.colors = {$in:[color]};
        }
        if(gender){
            query.gender = gender
        }
        if(minPrice || maxPrice){
            query.price = {};
            if(minPrice) query.price.$gte = Number(minPrice);
            if(maxPrice) query.price.$lte = Number(maxPrice);
        }
        if(search){
            query.$or = [
                {name:{$regex:search,$options:'i'}},
                {description:{$regex:search,$options:'i'}}
            ]
        }
        // sort logic
        let sort = {};
        if(sortBy){
            switch(sortBy){
                case 'priceAsc':
                    sort = {price:1};
                    break;
                case 'priceDesc':
                    sort = {price:-1};
                    break;
                case 'popularity':
                    sort = {rating:-1};
                    break;
                    default:
                        break;
            }
        }
        // fetch products and apply sorting and limit
        let products = await Product.find(query).sort(sort).limit(Number(limit)||0);
        res.json(products)
    } catch (error) {
        console.log(error);
        res.status(500).send('server error');
    }
})



module.exports = prodRouter;