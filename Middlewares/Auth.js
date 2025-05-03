

const jwt = require("jsonwebtoken")

exports.generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
}

exports.generateRefreshToken = (user) => {
    let token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '15m' });
    return token;
}

exports.verifyToken = (req, res, next) => {

    let token = req.cookies.accessToken;

    let data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (data) {
        req.data = data;
        return next();
    }
    else {

        let refreshToken = req.cookies.refreshToken;

        let data = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (data) {
            let payload = JSON.parse(JSON.stringify(data))
            let accessToken = generateAccessToken(payload);

            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                // path: '/token',
                sameSite: 'strict',
                secure: true,
            });

            req.data = data;
            return next();
        }
        else{
            return res.status(400).send({ isSucess: false, data: null, message: "Invalid Token" })
        }
    }
}

