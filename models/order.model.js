const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    order_id: String,
    status: String,
    cart_id: String,
    userInfo: {
        fullName: String,
        phone: String,
        address: String
    },
    user_id: String,
    deleted : {
        type: Boolean,
        default:false
    },
    products:[
        {
            product_id: String,
            price: Number,
            discountPercentage: Number,
            quantity: Number
        }
    ],
}, {timestamps:true})

const Order = mongoose.model("Order", orderSchema, "orders");
module.exports = Order;