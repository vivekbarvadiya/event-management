const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Vender = require("../models/vender.model");
const sendTokenForVenders = require("../utils/sendTokenForVenders");
const ErrorHandler = require('../utils/ErrorHandler.js');

exports.registerVender = catchAsyncErrors(async (req, res) => {

    const { venderName, email, password, businessName, description, address, contact_info } = req.body;

    const vender = await Vender.create({
        venderName, email, password, businessName, description, address, contact_info
    });

    // {
    //     "venderName":"vdpatel",
    //     "email":"vdpatel@gmail.com",
    //     "password":"vdpatel",
    //     "businessName":"catering",
    //     "description":"welcome to our service",
    //     "address":"surat",
    //     "contact_info":"9727563720"
    // }

    sendTokenForVenders(vender, 200, res);
})


exports.loginVender = catchAsyncErrors(async (req, res, next) => {

    const { venderName, password } = req.body;

    if (!venderName || !password) {
        return next(new ErrorHandler("all fields are required"));
    }

    const vender = await Vender.findOne({ venderName });
    if (!vender) return next(new ErrorHandler("User not found", 404));

    const isPasswordMatched = vender.ComparePassword(password);
    if (!isPasswordMatched) return next(new ErrorHandler("Wrong password", 401));

    sendTokenForVenders(vender, 200, res);

})


exports.logOut = catchAsyncErrors(async (req, res) => {

    res.clearCookie("venderToken",{
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:"vender logged out successfully"
    })

})