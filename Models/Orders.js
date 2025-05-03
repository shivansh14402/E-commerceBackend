
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
}, {
    timestamps: true,
    query: {
        getOrderByUser: function(userId) {
            return this.where({ 'user.user': new mongoose.Types.ObjectId(userId) })
        },
        getOrderByProduct: function(productId) {
            return this.where({ 'products.product': new mongoose.Types.ObjectId(productId) })
        }
    }
});

exports.Orders = mongoose.model('Orders', Orders);