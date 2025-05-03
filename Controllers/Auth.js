
const User = require('../Models/User').User;
const bcrypt = require('bcryptjs');

const { generateAccessToken, generateRefreshToken, verifyToken } = require("../Middlewares/Auth")

exports.registerNewUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password, phone } = req.body;

        let encryptedPassword = await bcrypt.hash(password, 10);

        let user = new User({
            first_name: first_name.toLowerCase(),
            last_name: last_name.toLowerCase(),
            email: email.toLowerCase(),
            password: encryptedPassword,
            phone
        });

        user = await user.save();

        let accessToken = generateAccessToken(user);
        let refreshToken = generateRefreshToken(user);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/token',
            sameSite: 'strict',
            secure: true,
        });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            path: '/token',
            sameSite: 'strict',
            secure: true,
        });

        return res.status(200).send({ isSuccess: true, message: "User registered successfully", data: user });
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({ isSuccess: false, message: "Error registering user", error: err });
    }
}

exports.loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (email && password) {

            let user = await User.findOne({ email: email });

            if (user) {

                let passworMatch = await bcrypt.compare(password, user.password)

                if(passworMatch){
                    let payload = JSON.parse(JSON.stringify(user))
                    let refreshToken = generateAccessToken(payload);
                    let accessToken = generateAccessToken(payload);
    
                    res.cookie("accessToken", accessToken, {
                        httpOnly: true,
                        // path: '/token',
                        sameSite: 'strict',
                        secure: true,
                    });
    
                    res.cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        // path: '/token',
                        sameSite: 'strict',
                        secure: true,
                    });
    
                    return res.status(200).send({ isSuccess: true, message: "Login Successfully", data: payload })
                }
                else{
                    return res.status(400).send({ isSuccess: false, message: "Incorrect password", data: null })
                }
            }
            else {
                return res.status(400).send({ isSuccess: false, message: "User not found", data: null });
            }
        }
        else {
            throw new Error("Email and password are required");
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({ isSuccess: false, message: err.message, error: err });
    }
}

