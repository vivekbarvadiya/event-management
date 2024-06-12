const mongoose = require("mongoose");
const ErrorHandler = require("../utils/ErrorHandler");

const serviceSchema = mongoose.Schema({
    venderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vender",
        required: [true, "this field is required"],
    },
    serviceName: {
        type: String,
        required: [true, "this field is required"],
        minlength: [6, "serviceName must be greater then 6 characters"],
    },
    description: {
        type: String,
        required: [true, "this field is required"],
        maxlength: [3000, "description can not exists 3000 characters"]
    },
    price: {
        type: Number,
        required: [true, "this field is required"],
    },
    category: {
        type: String,
        required: [true, "this field is required"],
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "review"
        }
    ]
}, { timestamps: true });


// const uniqueValidator = require("mongoose-unique-validator");
// serviceSchema.plugin(uniqueValidator, { message: "data already exists" });


// serviceSchema.pre("save", async function (next) {

//     const service = this;
//     if (!service) {
//         return next(new Error("Service model is not defined"));
//     }
//     const venderServiceounts = await mongoose.model.Service.countDocuments({ venderId: service.venderId });

//     if (venderServiceounts > 7) {
//         return next(new ErrorHandler("You can only create 7 service", 401));
//     }
//     next();

// });

module.exports = mongoose.model("service", serviceSchema);


// {
//     "_id": ObjectId("..."),
//     "vendor_id": ObjectId("..."),
//     "name": "Wedding Catering Package",
//     "description": "A full-service catering package for weddings.",
//     "price": 1500.00,
//     "category": "Catering",
//     "available_quantity": 10,
//     "created_at": ISODate("2023-01-01T00:00:00Z"),
//     "updated_at": ISODate("2023-01-01T00:00:00Z")
// }
