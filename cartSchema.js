import mongoose ,{Schema} from "mongoose";

const cartSchema = mongoose.Schema({

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