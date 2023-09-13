import mongoose from "mongoose";

const couponSchema = mongoose.Schema({

    couponCode:{
        type: String,
        required: true,
        unique: [true, "Coupon Code must be unique"]
    },

    discount:{
        type: Number,
        required: [true, "Discount amount is mandatory"]
    }
},

{
    timestamps: true
})

export default mongoose.model("coupon", couponSchema)