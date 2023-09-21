const mongoose  = require("mongoose");
const {Schema} = require("mongoose");
const {tshirtSchema} = require( __dirname + "/tshirtSchema.js")

const cartSchema = mongoose.Schema({

    userId:{
        type: {type: Schema.Types.ObjectId,
        ref: "user"}

    },

    product: {
        type: [tshirtSchema]
    },

    quantity: {
        type: Number,
        minNumber: [1, "You must have atleast one product"]
    }
})

module.exports = mongoose.model("cart", cartSchema);