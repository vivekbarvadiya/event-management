const express = require("express");
const { isAuthenticated } = require("../middlewares/jwtAuth");
const { createOrder } = require("../controllers/order.controller");

const router = express.Router();


router.post('/create',isAuthenticated,createOrder);


module.exports  = router; 