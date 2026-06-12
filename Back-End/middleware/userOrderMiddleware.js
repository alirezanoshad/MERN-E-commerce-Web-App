const Order = require('../models/order');
const orderProt = async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if (!order) {
        return res.status(404).json({ msg: "Order not found" });
    }
    if (order.user.toString() !== req.user.id) {
        return res.status(403).json({ msg: "Not authorized" });
    }
    next();
}
module.exports = {orderProt}