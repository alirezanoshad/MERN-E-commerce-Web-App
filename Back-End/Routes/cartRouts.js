const express = require('express');
const Cart = require('../models/cart');
const Product = require('../models/Product');
const {protect} = require('../middleware/authMiddleware');
const _ = require('lodash');
const cartRouter = express.Router();



// helper function to get a cart by userID or guestID
const getCart = async(userID,guestID)=>{
    if(userID){
        return await Cart.findOne({user:userID});
    }else if(guestID){
        return await Cart.findOne({guestID});
    }
    return null;
}

// @route POST /api/cart
// @desc add a product to the cart for a guest or logged in user
// @access public
cartRouter.post('/',async(req,res)=>{
    // getting info from req.body
    const cartData = _.pick(req.body,['productID','quantity','size','color','guestID','userID']);
    try {
        const product = await Product.findById(cartData.productID);
        if(!product) return res.status(404).json({msg:'product not found'});
        // check if the user is logged in or guest
        let cart = await getCart(cartData.userID,cartData.guestID);
        // if the cart exists so update it
        if(cart){
            const productIndex = cart.products.findIndex(
                (p)=>
                    p.productID.toString() === cartData.productID &&
                    p.size === cartData.size &&
                    p.color === cartData.color
                
            );
            if(productIndex > -1){
                // if the product already exist update the quantity
                cart.products[productIndex].quantity += Number(cartData.quantity);
            }else{
                // add the new product
                cart.products.push({
                    productID:cartData.productID,
                    name:product.name,
                    image:product.images[0].url,
                    price:product.price,
                    size:cartData.size,
                    color:cartData.color,
                    quantity:cartData.quantity
                });
            }
            // recalcualte the total price
            cart.totalPrice = cart.products.reduce(
                (acc,item)=> acc + item.price * item.quantity,
                0
            );
            // save the cart
            await cart.save();
            return res.status(200).json(cart);
        }else{
            // create new cart fot user or guest
            const newCart = await Cart.create({
                user: cartData.userID ? cartData.userID : undefined,
                guestID: cartData.guestID ? cartData.gustID : "guest_" + new Date().getTime(),
                products:[
                    {
                        productID:cartData.productID,
                        name:product.name,
                        image:product.images[0].url,
                        price:product.price,
                        size:cartData.size,
                        color:cartData.color,
                        quantity:cartData.quantity
                    },
                ],
                totalPrice:product.price * cartData.quantity,
            });
            return res.status(201).json(newCart);

        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
})


module.exports = cartRouter
