
const  Router = require("express").Router;

const { registerNewUser, loginUser } = require("../Controllers/Auth.js");

const router = Router();

router.get("/", (req, res) => {

    res.write("<h1>Welcome to the Auth API</h1>");
    res.end()
    // return res.send({ isSuccess: true, message: "Welcome to the Auth API" });
})

router.post("/register", registerNewUser);

router.post("/login", loginUser);


exports.router = router;