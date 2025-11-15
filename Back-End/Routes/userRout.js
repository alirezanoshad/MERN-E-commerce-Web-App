// this file contains user routes
// this file is imported in index.js
// importing express
const express = require("express");
// importing user Model
const User = require("../models/UserScheama");
// importing jwt
const jwt = require("jsonwebtoken");
// importing lodash
const _ = require("lodash");
// creating router
const router = express.Router();
// @route POST /api/users/register
router.post('/register',async(req,res)=>{
    // extracting name/email/password from request body
    const userData = _.pick(req.body,["name","email","password"]);
    try {
        res.send(userData)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
})

module.exports = router
