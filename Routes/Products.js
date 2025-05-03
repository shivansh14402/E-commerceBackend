
const Router = require("express").Router;

const { verifyToken } = require("../Middlewares/Auth");

const { getProductList, addNewProduct, placeOrder } = require("../Controllers/Product")

const router = Router();

router.get("/products", verifyToken, getProductList);

router.post("/addProd", verifyToken, addNewProduct);

router.post("/placeOrder", verifyToken, placeOrder);

exports.router = router;