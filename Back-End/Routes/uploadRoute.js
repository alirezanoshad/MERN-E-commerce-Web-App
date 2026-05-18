// importing express
const express = require('express');
// importing config
const config = require("config");
const uploadRouter = express.Router();
// protect middleware
const {protect} = require('../middleware/authMiddleware');
// importing axios
// const axios = require('axios');
// now i want upload images to this website throwh this example and documentation
// Request URL
// https://freeimage.host/api/1/upload

// Parameters
// key (required)	The API key.
// action	What you want to do [values: upload].
// source	Either a image URL or a base64 encoded image string. You can also use FILES["source"] in your request.
// format	Sets the return format [values: json (default), redirect, txt].
// Example call
// GET http://freeimage.host/api/1/upload/?key=12345&source=https://somewebsite/someimage.jpg&format=json

// Response
// If the format is json, the response will be a JSON object with the following keys:
// id	The ID of the image.
// url	The URL of the image.
// thumb	The URL of the thumbnail.
// size	The size of the image in bytes.
// width	The width of the image in pixels.
// height	The height of the image in pixels.
// mime	The MIME type of the image.
// Example response
// {
// 	"id": "12345",
// 	"url": "https://freeimage.host/i/12345.jpg",
// 	"thumb": "https://freeimage.host/i/12345.jpg",
// 	"size": "12345",
// 	"width": "12345",
// 	"height": "12345",
// 	"mime": "image/jpeg"
// }

// If the format is redirect, the response will be a redirect to the image.
// If the format is txt, the response will be a plain text file containing the image URL.
// the route
// @route POST /api/upload
// @desc Upload image
// @access private
// 
















module.exports = uploadRouter