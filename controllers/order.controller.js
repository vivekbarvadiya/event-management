const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Order = require("../models/order.model");
const ErrorHandler = require("../utils/ErrorHandler");

exports.createOrder = catchAsyncErrors(async (req,res,next)=>{
    const {services,address} = req.body;

    if(!services){
        return next(new ErrorHandler("first enter some services to cart",404));
    } 

    const order = new Order({
        services,
        address,
        
    })



})