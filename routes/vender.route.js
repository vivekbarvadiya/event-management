const express = require("express");
const { registerVender, loginVender, logOut } = require("../controllers/vender.controller");

const router = express.Router();

router.post("/register",registerVender);
router.post("/login",loginVender);
router.post("/logOut",logOut);


module.exports  = router; 