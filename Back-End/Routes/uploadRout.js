const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const config = require('config');
const uploadRouter = express.Router();
//  cloudinary configuration
cloudinary.config({
    cloud_name: config.get('cloudinary.cloudName'),
    api_key: config.get('cloudinary.cloudinaryAPIKey'),
    api_secret: config.get('cloudinary.apiSecret')
})


// multer setup using memory storage
const storage = multer.memoryStorage();
const upload = multer({storage:storage});
uploadRouter.post('/',upload.single('image'),async(req,res)=>{
    try {
        if(!req.file){
            return res.status(400).json({msg:'no file uploaded'});
        }
        // function to handle the stream upload to cloudinary
        const streamUpload = (fileBuffer)=>{
            return new Promise((resolve,reject)=>{
                const stream = cloudinary.uploader.upload_stream((error,result)=>{
                    if(result){
                    resolve(result);
                    }else{
                    reject(error);
                    }
                })
                // use streamifier to convert file buffer to a stream
                streamifier.createReadStream(fileBuffer).pipe(stream);
            })
        }
        // call the streamUpload function
        const result = await streamUpload(req.file.buffer);
        // respond with the uploaded image
        res.json({imageUrl:result.secure_url});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'server error'})
    }
})


module.exports = uploadRouter