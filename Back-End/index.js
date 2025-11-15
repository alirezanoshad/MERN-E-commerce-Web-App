// importing packages:
// express
const express = require("express");
// cors
const cors = require("cors");
// config
const config = require("config");
// importing routes
const userRoute = require("./Routes/userRout");
// importing database connection
const connectDB = require("./config/DB");
const app = express();
app.use(express.json());
app.use(cors());


// connecting database
connectDB();

// API Routes
app.use("/api/users", userRoute);

// creating web server
app.listen(config.get("server.port"), () => {
    console.log(`Server is running on port ${config.get("server.port")}`);
});
