// creating database connection
const mongoose = require("mongoose");
const config = require("config");
async function connectDB(){
    try{
        await mongoose.connect(config.get("server.database"));
        console.log("Database connected");
    } catch(err){
        console.log("Database connection failed", err);
    }
}
// exporting database connection
module.exports = connectDB
