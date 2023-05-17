const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const { authorization: authString } = req.headers;

    //Check if the Auth String has correct form
    if (!authString || !authString.startsWith("Bearer "))
        return res.status(401).json({ msg: "Authorization Error." });

    //Split token
    const token = authString.split(" ")[1];

    //Verify the token
    const payload = jwt.verify(token, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });

    req.userInfo = payload;

    next();
};

module.exports = auth;
