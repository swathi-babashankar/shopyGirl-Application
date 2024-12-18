const mongoose  = require("mongoose");
const {Schema} = require("mongoose");
const tshirtSchema = require(__dirname + "/tshirtSchema.js").schema


const cartSchema =  mongoose.Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },

    product: {
        type: [tshirtSchema],
    },

    quantity: {
        type: Number,
        minNumber: [1, "You must have atleast one product"]
    },

    size: {
        type: String,
        required: [true, "Please enter the size"]
    }
});

module.exports = mongoose.model("cart", cartSchema);