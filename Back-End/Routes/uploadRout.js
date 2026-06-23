const express = require('express');
const multer = require('multer');
const axios = require('axios');
const config = require('config');
const FormData = require('form-data');
const upload = multer({
    storage: multer.memoryStorage()
});
const uploadRouter = express.Router();
// just a simple api for uploading file
uploadRouter.post('/',upload.single('image'),async(req,res)=>{
    try {
        // check if any file sent
        if(!req.file){
            return res.status(400).json({msg:'no file resieved'});
        }
        const form = new FormData();
        form.append('key',config.get('server.imageUpload-API-Key'))
        form.append('format','json');
        // attach the buffer
        form.append('source',req.file.buffer,{filename:req.file.originalname,contentType:req.file.mimetype});
        const response = await axios.post('https://freeimage.host/api/1/upload',form);
        res.json(response.data.image.image.url);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'server error'})
    }
})
module.exports = uploadRouter