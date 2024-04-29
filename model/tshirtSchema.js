const { url } = require("inspector");
const mongoose = require("mongoose");

const tshirtSchema = new mongoose.Schema({

    name: {
        type: String,
        minLength: [3, "Enter a valid name"],
        required: [true, "You must enter the name of t shirt"]
    },

    brand: {
       type: String,
       required: [true, "Please enter the brand of the t shirt"]
    },

    category: {
        type: String,
        enum: ["Sports wear","Cropped", "Full Sleeve", "Half sleeve", "Hoodie", "Sleeveless" ],
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    description: {
        type: String

    },

    images: [{
        type: String,
        required: true,
    }],

    publicId: [{
        type: String,
        required: true
    }],

    discount: {
        type: Number,

    }

},
{
    timestamps: true
}
)

module.exports = mongoose.model("tshirt", tshirtSchema)