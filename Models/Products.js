
const mongoose = require("mongoose");

const Product = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    imageUrl: {
        type: Array,
        required: false
    },
    description: {
        type: String,
        required: true
    },
}, { timestamps: true });

Product.query.sendAll = function (title){
    return this.where({ title: new RegExp(title, "") })
}

exports.Product = mongoose.model("Product", Product);