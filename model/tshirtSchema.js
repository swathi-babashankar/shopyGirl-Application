import mongoose from "mongoose";

const tshirtSchema = mongoose.Schema({

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
        enum: ["sports wear","cropped", "Full Sleeve", "half sleeve", "hoodie", "sleeveless" ],
        required: true
    },

    price: {
        type: Number,
        enum: "Rupees"
    },

    images: [{
            secure_url: {
                type: String,
                required: true
            }
    }],

    discount: {
        type: Number,

    }

},
{
    timeStamps: true
}
)

module.exports = mongoose.model("tshirt", tshirtSchema)