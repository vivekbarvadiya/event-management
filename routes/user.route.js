const express = require("express");
const { registerUser, login, logOut } = require("../controllers/user.controller");

const router = express.Router();

router.post("/register",registerUser);
router.post("/login",login);
router.post("/logout",logOut);

module.exports  = router; 