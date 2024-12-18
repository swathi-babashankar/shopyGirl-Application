const mongoose = require("mongoose");
const {Schema} = require("mongoose")

const orderSchema = new mongoose.Schema({
 
    productId: {
        type: [{type: Schema.Types.ObjectId,
        ref: "cart"}],
        required: [true]
    },

    realProductId: {
        type: [{type: Schema.Types.ObjectId,
            ref: "tshirt"}],
            required: [true]

    },

    userId: {
        type: Schema.Types.ObjectId,
        required: [true]
    },

    couponCode:{
        type: String,
        couponPrice: {
            type: Number,
            required: [true, "Please enter the discount amount if coupon is applicable"]
        }

    },

    netPrice: {
        type: Number,
        required: true,
    },

    name:{
        type: String,
        required: true
    },

    address: {
       type: String,
       required: true,
    },

    phoneNo:{
        type: String,
        required: true

    },

    quantity: {
        type: Number,
        required: [true, "Please enter the quantity of product"],
        minNumber: [1, "You should have atleast one product to place your order"]

    },

    razorpayId: {
        type: String
    }

},

{
    timestamps: true
});

module.exports = mongoose.model("order", orderSchema);