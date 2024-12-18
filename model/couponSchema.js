const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({

    couponCode:{
        type: String,
        required: true,
        unique: [true, "Coupon Code must be unique"]
    },

    discount:{
        type: Number,
        required: [true, "Discount amount is mandatory"]
    },

    validTill: {
        type: Date,
        required: true
    }
},

{
    timestamps: true
})

module.exports =  mongoose.model("coupon", couponSchema);