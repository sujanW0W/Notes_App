const express = require("express");
const route = express.Router();

const { userLogin, userRegister } = require("../controllers/users");

route.post("/login", userLogin);

route.post("/register", userRegister);

module.exports = route;
