// importing packages:
// express
const express = require("express");
// cors
const cors = require("cors");
// config
const config = require("config");
// importing routes
const userRoute = require("./Routes/userRout");
const productRoute = require("./Routes/productRouts");
const cartRouter = require("./Routes/cartRouts");
const checkOutRouter = require("./Routes/checkOutRouts");
const orderRouter = require("./Routes/orderRoutes");
const uploadRouter = require("./Routes/uploadRoute");
const adminRouter = require("./Routes/adminRoutes");
const subscriberRouter = require("./Routes/subscriberRoute");
const adminproductsRouter = require("./Routes/productsAdminRouts");
// importing database connection
const connectDB = require("./config/DB");
const app = express();
app.use(express.json());
app.use(cors());


// connecting database
connectDB();

// API Routes
app.use("/api/users", userRoute);
app.use("/api/product",productRoute);
app.use("/api/cart",cartRouter);
app.use('/api/checkOut',checkOutRouter)
app.use('/api/order',orderRouter);
app.use('/api/upload',uploadRouter);
app.use('/api/subscriber',subscriberRouter);
// admin routes
app.use('/api/admin',adminRouter);
app.use('/api/admin/products',adminproductsRouter);

// creating web server
app.listen(config.get("server.port"), () => {
    console.log(`Server is running on port ${config.get("server.port")}`);
});
