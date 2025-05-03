
const { Product } = require("../Models/Products");
const { Orders } = require("../Models/Orders");

exports.addNewProduct = async (req, res) => {

    try {

        let { title, description, price, imageUrl= [] } = req.body;

        let newProd = await Product.create({ title, description, price, imageUrl });

        newProd.save();

        return res.status(200).send({ isSuccess: true, message: "Product Added Successfully", data: newProd })

    }
    catch (err) {
        return res.status(400).send({ isSuccess: false, message: err.message, data: null })
    }
}

exports.getProductList = async (req, res) => {

    try {

        let data = await Product.find().sendAll("").exec();

        return res.status(200).send({ isSuccess: true, message: "Product List Fetched Successfully", data: data })
    }
    catch (err) {
        return res.status(400).send({ isSuccess: false, message: err.message, data: null })
    }
}

exports.placeOrder = async (req, res) => {

    try {

        let { products, user } = req.body;

        if(products, user){
            let order = await Orders.create({ products, user });

            order.save();

            order = await order.populate('products.product');
            order = await order.populate('user.user')

            return res.status(200).send({ isSuccess: true, message: "Order Placed Successfully", data: order })
        }
    }
    catch(err){
        return res.status(400).send({ isSuccess: false, message: err.message, data: null })
    }
}
