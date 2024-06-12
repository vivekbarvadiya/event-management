const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    // venderId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "vender",
    //     required: [true, "this field is required"],
    // },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "this field is required"],
    },
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"service",
    }],
    address:{
        type:String,
        required:true
    },
    itemsPrice: {
        type: Number,
    },
    taxPrice:{
        type:Number
    },
    shippingPrice:{
        type:Number
    },
    status: {
        type:["pending","done"],
        required: [true, "this field is required"],
        default:"pending"
    }
}, { timestamps: true });



// const uniqueValidator = require("mongoose-unique-validator");
// userSchema.plugin(uniqueValidator, { message: "data already exists" });


module.exports = mongoose.model("order", orderSchema);


// {
//     "_id": ObjectId("..."),
//     "user_id": ObjectId("..."),
//     "vendor_id": ObjectId("..."),
//     "products": [
//         {"product_id": ObjectId("..."), "quantity": 2}
//     ],
//     "total_price": 3000.00,
//     "status": "pending",
//     "created_at": ISODate("2023-01-01T00:00:00Z"),
//     "updated_at": ISODate("2023-01-01T00:00:00Z")
// }
