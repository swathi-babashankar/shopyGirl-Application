import mongoose, { Schema } from "mongoose";
import config from "../config/index";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({

    name: {
        type: String,
        minLength: [2, "Please enter your name"],
        required: [true, "Your name is required"]
    },

    email: {
        type: String,
        required: [true, "Your name is required"]
    },

    password: {
        type: String,
        minLength: [6, "Password should atleast have 6 charecters "],
        maxLength: [20, "Password must not exceed 20 charecters"],
        required: [true, "Please enter your password"]
    },

    PhoneNo: {
        type: String,
        minLength: [10, "Please enter valid mobile number"],
        maxLength: [10, "Please enter valid mobile number"],
        required: [true, "Please enter your mobile number"]
    },

    productId: {
        type: [{type: Schema.Types.ObjectId,
        ref: "tshirt"}]
    }

},

{
    timestamps: true
}

);

userSchema.methods = {
    tokenGenerate: function(){
        return jwt.sign(
            {
                id: this._id, 
                email: this.email},
                config.JWT_SECRET, 
                {expiresIn: config.JWT_EXPIRY}, 
                {algorithm: "SHA256"}
            )

    }
}

module.exports = mongoose.model("user", userSchema);