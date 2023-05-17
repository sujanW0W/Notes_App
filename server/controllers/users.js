const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const userRegister = async (req, res) => {
    const { username, password } = req.body;

    //Validate the input
    if (!username || !password) throw "Please provide Credentials.";

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //Insert into the DB
    const response = await User.create({
        username,
        password: hash,
    });

    const record = response.toJSON();

    //Generate token
    const token = jwt.sign(
        {
            userId: record.id,
            username: record.username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        }
    );

    res.status(201).json({ token });
};

const userLogin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) throw "Please provide Credentials.";

    let user = await User.findOne({ where: { username } });

    if (!user) return res.status(404).json({ msg: `${username} Not Found.` });

    user = user.toJSON();

    //Compare password
    const compare = await bcrypt.compare(password, user.password);

    if (!compare) return res.status(400).json({ msg: "Password incorrect." });

    const token = jwt.sign(
        {
            userId: user.id,
            username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
    );

    res.status(200).json({ token });
};

module.exports = { userRegister, userLogin };
