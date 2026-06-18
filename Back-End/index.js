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
const orderRouter = require("./Routes/orderRoutes");
const adminRouter = require("./Routes/adminRoutes");
const subscriberRouter = require("./Routes/subscriberRoute");
const adminproductsRouter = require("./Routes/productsAdminRouts");
const adminOrderRouter = require("./Routes/adminOrderRoutes");
const paymentRouter = require("./Routes/paymentRoute");
const uploadRouter = require("./Routes/uploadRout");
// importing database connection
const connectDB = require("./config/DB");
const { redisClient, connectRedis } = require('./config/redisClient');
const app = express();
app.use(express.json());
app.use(cors());
// connecting database
connectDB();
// API Routes
app.use("/api/users", userRoute);
app.use("/api/product",productRoute);
app.use("/api/cart",cartRouter);
app.use('/api/order',orderRouter);
app.use('/api/subscriber',subscriberRouter);
// admin routes
app.use('/api/admin',adminRouter);
app.use('/api/admin/products',adminproductsRouter);
app.use('/api/admin/orders',adminOrderRouter);
// payment routes
app.use('/api/payment',paymentRouter);
// upload routes
app.use('/api/upload',uploadRouter);
// redis start
(async () => {
    await connectRedis();
})();
//---------------------------------
// creating web server
app.listen(config.get("server.port"), () => {
    console.log(`Server is running on port ${config.get("server.port")}`);
});