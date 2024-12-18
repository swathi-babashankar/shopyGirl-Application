const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    phoneNo: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    secret: {
        type: String,
        required: true
    },

    default: {
        type: Boolean,
        default: true
    },
    adminToken : {
        type: String
    }
    
});



module.exports = mongoose.model("admin", adminSchema);