const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "service",
        required: [true, "this field is required"],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "this field is required"],
        unique:true
    },
    comment:{
        type:String,
        required: [true, "this field is required"],
    },
    rating: {
        type: Number,
        required: [true, "this field is required"],
        min: 1,
        max: 5,
    },

},{timestamps:true});


module.exports = mongoose.model("review",reviewSchema);


// {
//     "_id": ObjectId("..."),
//     "product_id": ObjectId("..."),
//     "user_id": ObjectId("..."),
//     "rating": 5,
//     "comment": "Excellent service!",
//     "created_at": ISODate("2023-01-01T00:00:00Z"),
//     "updated_at": ISODate("2023-01-01T00:00:00Z")
// }
