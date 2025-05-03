
const Router = require("express").Router;

const { verifyToken } = require("../Middlewares/Auth");

const { getProductList, addNewProduct, placeOrder, fetchOrderOfUser, fetchOrderByProductId } = require("../Controllers/Product")

const router = Router();

router.get("/products", verifyToken, getProductList);

router.post("/addProd", verifyToken, addNewProduct);

router.post("/placeOrder", verifyToken, placeOrder);

router.get("/myorders", verifyToken, fetchOrderOfUser);

router.get("/orders/:productId", verifyToken, fetchOrderByProductId);

exports.router = router;