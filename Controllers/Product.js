
const { Product } = require("../Models/Products");
const { Orders } = require("../Models/Orders");

exports.addNewProduct = async (req, res) => {

    try {

        let { title, description, price, imageUrl = [] } = req.body;

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

        let { search="", size=100, page=0 } = req.query;

        let data = await Product.find()
        .where({
            "$or": [
                {title: { '$regex': search, '$options': 'i' }},
                {description: { '$regex': search, '$options': 'i' }}
            ]
        })
        .select(['title', 'description'])
        .skip(page*size)
        .limit(size)
        .exec();

        return res.status(200).send({ isSuccess: true, message: "Product List Fetched Successfully", data: data })
    }
    catch (err) {
        return res.status(400).send({ isSuccess: false, message: err.message, data: null })
    }
}

exports.placeOrder = async (req, res) => {

    try {

        let { products, user } = req.body;

        if (products, user) {
            let order = await Orders.create({ products, user });

            order.save();

            order = await order.populate('products.product');
            order = await order.populate('user.user')

            return res.status(200).send({ isSuccess: true, message: "Order Placed Successfully", data: order })
        }
    }
    catch (err) {
        return res.status(400).send({ isSuccess: false, message: err.message, data: null })
    }
}

exports.fetchOrderOfUser = async (req, res) => {

    try {
        let userId = req?.data?._id;

        let { search="", createdAtStart, createdAtEnd } = req?.query;

        console.log(createdAtStart, createdAtEnd)

        if(userId){
            let orders = await Orders.find()
            .getOrderByUser(userId)
            .populate('products.product')
            .where('createdAt').gte(new Date(createdAtStart)).lte(new Date(createdAtEnd))
            .exec();

            orders = orders.filter((orders) => {

                if(orders?.products?.length > 0){
                   
                    orders.products = orders?.products.filter((product) => {

                        return (
                            (product?.product?.title?.toLowerCase()?.includes(search) || product?.product?.description?.toLowerCase()?.includes(search))
                        )
                    });

                    return orders.products?.length > 0;
                }

                return false;
            })

            return res.status(200).send({ isSuccess: true, message: "Orders Fetched Successfully", data: orders })
        }

    }
    catch (err) {
        return res.status(400).send({ isSuccess: false, message: err.message, data: null });
    }
}

exports.fetchOrderByProductId = async (req, res) => {

    try {
        let productId = req?.params?.productId;

        if(productId){
            let orders = await Orders.find().getOrderByProduct(productId).populate('products.product').exec();
            return res.status(200).send({ isSuccess: true, message: "Orders Fetched Successfully", data: orders })
        }

    }
    catch (err) {
        return res.status(400).send({ isSuccess: false, message: err.message, data: null });
    }
}