const mongoose  = require("mongoose");
const {Schema} = require("mongoose");

const cartSchema = mongoose.Schema({

    userId:{
        type: {type: Schema.Types.ObjectId,
        ref: "user"}

    },

    product: {
        type: [{type: Schema.Types.Subdocument,
        ref: "tshirt"}]
    },

    quantity: {
        type: Number,
        minNumber: [1, "You must have atleast one product"]
    }
})

module.exports = mongoose.model("cart", cartSchema)