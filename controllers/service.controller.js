const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Service = require("../models/service.model.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const { sendResponse } = require("../utils/sendResponse.js");

exports.createService = catchAsyncErrors(async (req, res, next) => {
    const { serviceName, description, price, category } = req.body;


    const service = await Service.create({
        venderId: req.vender._id,
        serviceName,
        description,
        price,
        category
    })

    sendResponse(200, "service created successfully", service, res);

})

exports.getAllService = catchAsyncErrors(async (req, res) => {
    const allServices = await Service.find();

    sendResponse(200, "All services retrieved successfully", allServices, res);
})

exports.getAllServiceVenders = catchAsyncErrors(async (req, res, next) => {

    if (req.params.id === req.vender._id.toString()) {

        const vendersService = await Service.find({ vednerId: req.vender._id });

        sendResponse(200, `Venders services with id ${req.vender._id}`, vendersService, res);
    }
    else {
        return next(new ErrorHandler("error while fetching data", 401));
    }

})

exports.updateService=catchAsyncErrors(async (req,res)=>{
    let service = await Service.findById(req.params.id);

    if(!service){
        return next(new ErrorHandler("service not found"));
    }

    service = await Service.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    });

    sendResponse(200,"service updated successfully",service,res);

})

exports.deleteService = catchAsyncErrors(async (req,res)=>{
    const service = await Service.findById(req.params.id);

    if(!service){
        return next(new ErrorHandler("service not found"));
    }

    await Service.findByIdAndDelete(req.params.id);

    sendResponse(200,"service deleted successfully",service,res);
})

exports.serviceDetails = catchAsyncErrors(async (req,res)=>{
    const service = await Service.findById(req.params.id);

    if(!service){
        return next(new ErrorHandler("service not found"));
    }

    sendResponse(200,"service retrived successfully",service,res);

})