const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const Review = require("../models/review.model.js");
const Service = require("../models/service.model.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const { sendResponse } = require("../utils/sendResponse.js");

exports.createReview = catchAsyncErrors(async (req, res, next) => {
    const service = await Service.findById(req.params.serviceId);
    const userId = req.user._id;

    const { comment, rating } = req.body;


    if (!service) {
        return next(new ErrorHandler("service not found", 404));
    }

    const review = new Review({
        serviceId: service._id,
        userId,
        comment,
        rating
    })

    await review.save();

    service.reviews.push(review._id);
    await service.save();

    sendResponse(200, "review created successfully", review, res);

});

exports.getAllReviews = catchAsyncErrors(async (req, res) => {

    const service = await Service.findById(req.params.serviceId);

    if (!service) {
        return next(new ErrorHandler("service not found", 404));
    }

    const reviews = service.reviews;
    sendResponse(200, "all reviews", reviews, res);

});



//error occuring
exports.deleteReview = catchAsyncErrors(async (req, res,next) => {

    const review = await Review.find({ serviceId: req.params.serviceId, userId: req.user._id });

    if (!review) {
        return next(new ErrorHandler("review not found", 404));
    }

    if (review.userId.toString() !== req.user._id.toString() ) {
        return next(new ErrorHandler("You can delete only your review"));
    }

    await review.remove();

    const service = await Service.findByIdAndUpdate(req.params.serviceId, { $pull: { reviews: review._id } }, { new: true });

    sendResponse(200,"review deleted",service,res);

})