const express = require('express');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const cookieParser = require('cookie-parser');

require("./config/db.js").db;
dotEnv.config({ path: "./.env" });

const authRouter = require('./Routes/Auth.js').router;
const productRouter = require("./Routes/Products.js").router

let server = express();

server.use(express.json());
server.use(cookieParser());

server.use("/auth", authRouter);
server.use("/product", productRouter);

server.listen(8000, () => {
    console.log("Server is running on port 8000");
})