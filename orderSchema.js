import mongoose, { Schema,  } from "mongoose";

const orderSchema = mongoose.Schema({
 
    productId: {
        type: [{type: Schema.Types.ObjectId,
        ref: "cart"}],
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
       net: {
        // chance of getting error
         $subract: ["$couponCode.$couponPrice", "$netprice"]
        }
    },

    address: {
       name: { type: String, required: true},
       building: {type: String, required: true},
       street: {type: String, required: true},
       pincose: {type: String, required: true},
       district: {type: String, required: true},
       state: {type: String, required: true}

    },

    quantity: {
        type: String,
        required: [true, "Please enter the quantity of product"],
        minNumber: [1, "You should have atleast one product to place your order"]

    },

    

});

module.exports = mongoose.model("order", orderSchema);