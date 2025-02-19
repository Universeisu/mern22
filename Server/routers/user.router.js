const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controller");
//const authJwt = require("../middlewares/authJwt.middleware")

router.post("/sign", userControllers.sign);

router.post("/", userControllers.addUser);

module.exports = router;
