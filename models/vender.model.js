const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const venderSchema = mongoose.Schema({
    venderName: {
        type: String,
        required: [true, "this field is required"],
        unique: true,
        minlength: [6, "username must be greater then 6 characters"],
        maxlength: [20, "username must be less then 20 characters"]
    },
    email: {
        type: String,
        required: [true, "this field is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "this field is required"],
        minlength: [6, "password must be greater then 6 characters"],
        maxlength: [20, "password must be less then 20 characters"]
    },
    profilePic: {
        type: String,
    },
    businessName: {
        type: String,
        required: [true, "this field is required"],
        minlength: [6, "businessName must be greater then 6 characters"],
    },
    description: {
        type: String,
        required: [true, "this field is required"],
        maxlength: [3000, "description can not exists 3000 characters"]
    },
    address: {
        type: String,
        required: [true, "this field is required"],
    },
    contact_info: {
        type: String,
        required: [true, "this field is required"],
    },
    isVender: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });


const uniqueValidator = require("mongoose-unique-validator");
venderSchema.plugin(uniqueValidator, { message: "data already exists" });

venderSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

venderSchema.methods.getVenderToken = function () {
    return jwt.sign({ venderId: this._id, isVender: true }, process.env.JWT_SECRET_KEY_FOR_VENDERS, {
        expiresIn: process.env.JWT_EXPIRED_IN_FOR_VENDERS
    })
}


venderSchema.methods.ComparePassword=async function(password){
    return await bcrypt.compare(this.password,password);
}

module.exports = mongoose.model("vender", venderSchema);

// {"_id": ObjectId("..."),
//     "user_id": ObjectId("..."),
//         "business_name": "John's Catering",
//             "description": "Providing the best catering services for events.",
//                 "address": "123 Main St, Anytown, USA",
//                     "contact_info": "john@example.com, +1234567890",
//                         "created_at": ISODate("2023-01-01T00:00:00Z"),
//                             "updated_at": ISODate("2023-01-01T00:00:00Z")}