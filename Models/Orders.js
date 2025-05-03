
const mongoose = require("mongoose");

const Orders = new mongoose.Schema({
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: Number
        }
    ],
    user: {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    }
}, { timestamps: true });

exports.Orders = mongoose.model('Orders', Orders);