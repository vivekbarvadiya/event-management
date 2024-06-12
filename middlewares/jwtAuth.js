const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../models/user.model");
const Vender = require("../models/vender.model");


exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) return next(new ErrorHandler("Please first login to access resourses"));

    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findOne({ _id: decodedData.id });
    // console.log(req.user.id)

    next();

})

exports.isAuthenticatedVender = catchAsyncErrors(async (req, res, next) => {

    const { token } = req.cookies;
    if (token) {
        return next(new ErrorHandler("You are not allowed to do this operation, you are a user", 401));
    }

    const { venderToken } = req.cookies;
    if (!venderToken) return next(new ErrorHandler("Please login to perform any option", 404));

    const decodedData = jwt.verify(venderToken, process.env.JWT_SECRET_KEY_FOR_VENDERS);

    req.vender = await Vender.findOne(decodedData.id);

    if (!req.vender) {
        return next(new ErrorHandler("Vender not found with this token", 404));
    }

    if (req.vender && decodedData.isVender) {
        next();
    }
    else {
        return next(new ErrorHandler("You are not allowed to do this operation", 401));
    }
})

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token, venderToken } = req.cookies;

    if (!token && !venderToken) {
        return next(new ErrorHandler("first you have to login", 401));
    }

    if (token) {
        try {
            const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = await User.findOne({ _id: decodedData.id });
            if (!req.user) {
                return next(new ErrorHandler("user not found with this token", 404));
            }
        } catch (err) {
            return next(new ErrorHandler(err, 404));
        }
    }
    else if (venderToken) {
        try {
            const decodedData = jwt.verify(venderToken, process.env.JWT_SECRET_KEY_FOR_VENDERS);
            req.vender = await Vender.findOne(decodedData.id);
            if (!req.vender) {
                return next(new ErrorHandler("Vender not found with this token", 404));
            }
        } catch (error) {
            return next(new ErrorHandler(err, 404));
        }
    }
    next();
})