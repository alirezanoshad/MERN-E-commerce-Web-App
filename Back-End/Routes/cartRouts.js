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
                    price: product.discountPrice > 0 ? product.discountPrice : product.price,
                    originalPrice:product.price,
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
            cart.originalTotalPrice = cart.products.reduce(
                (acc, item) => acc + item.originalPrice * item.quantity,
                0
            );
            // save the cart
            await cart.save();
            return res.status(200).json(cart);
        }else{
            // create new cart fot user or guest
            const newCart = await Cart.create({
                user: cartData.userID || undefined,
                guestID: cartData.userID ? undefined : (cartData.guestID || 'guest_' + Date.now()),
                products:[
                    {
                        productID:cartData.productID,
                        name:product.name,
                        image:product.images[0].url,
                        price: product.discountPrice > 0 ? product.discountPrice : product.price,
                        originalPrice:product.price,
                        size:cartData.size,
                        color:cartData.color,
                        quantity:cartData.quantity
                    }
                ],
                totalPrice:product.price * cartData.quantity,
                originalTotalPrice:product.originalPrice * cartData.quantity,
            });
            return res.status(201).json(newCart);

        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
})
// @route PUT /api/cart
// @desc update product quantity in the cart for a guest or logged-in user
// @access public
cartRouter.put('/',async(req,res)=>{
    const cartData = _.pick(req.body,['productID','quantity','size','color','userID','guestID'])
    try {
        let cart = await getCart(cartData.userID,cartData.guestID);
        if(!cart) return res.status(404).json({msg:'cart not found'});
        // finding product index
        const productIndex = cart.products.findIndex(
            (p)=>
                p.productID.toString() === cartData.productID &&
                p.size === cartData.size &&
                p.color === cartData.color
        );

        if(productIndex > -1){
            // update quantiry
            if(cartData.quantity > 0){
                cart.products[productIndex].quantity = cartData.quantity;
            }else{
                // remove the product if quantity is 0
                cart.products.splice(productIndex,1);
            }

            // update the total price
            cart.totalPrice = cart.products.reduce(
                (acc,item) => acc + item.price * item.quantity,0
            );

            // save the cart
            await cart.save();
            return res.status(200).json(cart);
        }else{
            return res.status(404).json({msg:'product not found in cart'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
});
// @route DELETE /api/cart
// @desc remove a product from a cart
// @access public
cartRouter.delete('/',async(req,res)=>{
    // getting cart data
    const cartData = _.pick(req.body,['productID','userID','guestID','color','size']);
    // try catch block
    try {
        // finding cart
        let cart = await getCart(cartData.userID,cartData.guestID);
        if(!cart) return res.status(404).json({msg:'product not found in cart'});
        // getting product index
        const productIndex = cart.products.findIndex(
            (p)=> p.productID.toString() === cartData.productID &&
            p.size === cartData.size &&
            p.color === cartData.color
        );
        // if find this product remove it with splice method
        if(productIndex > -1){
            cart.products.splice(productIndex,1);
            // also update the total price
            cart.totalPrice = cart.products.reduce((acc,item)=> acc + item.price * item.quantity,0);
            // save the cart
            await cart.save();
            return res.status(200).json(cart);
        }else{
            return res.status(404).json({msg:'product not found in the cart'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});
// @route GET/api/cart
// @desc get get logged-in users or guest users cart to display
// @accedd public
cartRouter.get('/',async(req,res)=>{
    // getting guest or user ID from query
    const loggedOrGuest = _.pick(req.query,['userID','guestID'])
    try {
        // get cart
        const cart = await getCart(loggedOrGuest.userID,loggedOrGuest.guestID);
        // if cart exist response with information
        if(cart){
            res.json(cart);
        }else{
            res.status(404).json({msg:'cart not found'});
        }
    } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
}
});
// @route POST /api/cart/merge
// @desc merge guest cart into user cart on login
// @access private
cartRouter.post('/merge',protect,async(req,res)=>{
    // get guest user id
    const guestUser = _.pick(req.body,['guestID']);
    try {
        // find the guest cart and user cart
        const guestCart = await Cart.findOne({guestID:guestUser.guestID});
        // now user cart
        const userCart = await Cart.findOne({user:req.user._id});
        // if guestCart is present so we check if the products are thre
        if(guestCart){
            if(guestCart.products.length === 0){
                return res.status(400).json({msg:'guest cart is empty'});
            }
            if(userCart){
                // merge guest cart into user cart
                guestCart.products.forEach((guestItem)=>{
                    const productIndex = userCart.products.findIndex((item)=> 
                        item.productID.toString() === guestItem.productID.toString() &&
                        item.size === guestItem.size &&
                        item.color === guestItem.color
            );

            if(productIndex > -1){
                // if the item is exist in the userCart update the quantity
                userCart.products[productIndex].quantity += guestItem.quantity;
            }else{
                // otherwise add the guest item to the cart 
                userCart.products.push(guestItem);
            }

                });

                userCart.totalPrice = userCart.products.reduce((acc,item)=> acc + item.price * item.quantity,0);
                await userCart.save();
                // remove the guest cart after merging
                try {
                    await Cart.findOneAndDelete({guestID:guestUser.guestID});
                } catch (error) {
                    console.log(error);

                }
                res.status(200).json(userCart);
            }else{
                // if the user has no existing cart assign the guest cart to  the user
                guestCart.user = req.user._id;
                guestCart.guestID = undefined;
                await guestCart.save();
                res.status(200).json(guestCart);
            }
        }else{
            if(userCart){
                // guest cart has already been merged so return the user cart
                return res.status(200).json(userCart)
            }
            res.status(404).json({msg:'guest cart not found'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
})
module.exports = cartRouter