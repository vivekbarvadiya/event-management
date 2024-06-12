const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/user.model");
const sendToken = require("../utils/sendToken");
const ErrorHandler = require('../utils/ErrorHandler.js');
const sendEmail = require("../utils/sendMail.js");

const {uploadImageToCloudinary} = require("../utils/imageUploader.js");



exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { userName, email, password } = req.body;

    const avatar = req.files.avatar;

    const image = await uploadImageToCloudinary(
        avatar,
        process.env.FOLDER_NAME,
        1000,
        1000
      )

    const existingUser = await User.findOne({ userName });
    if (existingUser) {
        return next(new ErrorHandler("user exist", 501));
    }


    // Create a new user
    const user = await User.create({ userName, email, password, avatarUrl: image.secure_url });

    // const savedUser = user.save();

    // res.status(200).json(savedUser);

    const subject = 'Welcome to Our Service';
    const text = `Hello ${userName},\n\nThank you for registering with us.\n\nBest regards,\nYour Company Name`;
    sendEmail(email, subject, text);

    sendToken(user, 201, res);
});

exports.login = catchAsyncErrors(async (req, res, next) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return next(new ErrorHandler("Please enter username and password", 400));
    }

    const user = await User.findOne({ userName });

    if (!user) {
        return next(new ErrorHandler("User not found", 400));
    }

    const isCorrectPassword = await user.comparePassword(password);

    if (!isCorrectPassword) {
        return next(new ErrorHandler("wrong password", 401));
    }

    sendToken(user, 200, res);
})


exports.logOut = catchAsyncErrors(async (req, res) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    }).status(200).json({
        success: true,
        message: "user logged out successfully !"
    })

})