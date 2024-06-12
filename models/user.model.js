const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, "this field is required"],
        unique: true,
        minlength: [3, "username must be greater then 6 characters"],
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
    avatarUrl: {
        type: String,
    },
}, { timestamps: true });

//validators for unique constraints in mongodb

// const uniqueValidator = require("mongoose-unique-validator");
// userSchema.plugin(uniqueValidator, { message: "data already exists" });

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRED_IN
    });
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}



module.exports = mongoose.model("user", userSchema);


// {
//     "_id": ObjectId("..."),
//     "username": "john_doe",
//     "email": "john@example.com",
//     "password": "hashed_password",
//     "role": "customer",
//     "created_at": ISODate("2023-01-01T00:00:00Z"),
//     "updated_at": ISODate("2023-01-01T00:00:00Z")
// }
