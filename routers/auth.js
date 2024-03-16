const express = require("express");
const router = express.Router();
const { signUp, logIn , resetPassword , deleteAccount} = require("../api-handlers");



router.post("/signup", signUp); // handling http://localhost:4000/signup api

router.post("/login", logIn); // handling http://localhost:4000/login api

router.put("/resetPassword", resetPassword) // handling http://localhost:4000/resetpassword api

router.delete("/deleteaccount", deleteAccount); // handling http://localhost:4000/deleteaccount api

module.exports = router;
