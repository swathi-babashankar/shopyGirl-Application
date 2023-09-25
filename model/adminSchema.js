const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config/index")

const adminSchema = mongoose.Schema({

    name: {
        type: String,
    },

    phoneNo: {
        type: String,
        required: true
    },

    email: {
        type: String
    },

    password: {
        type: String
    },

    secret: {
        type: String
    },

    default: {
        type: Boolean,
        default: true
    }
    
});

adminSchema.methods = {
    tokenGenerate: function(){
        return jwt.sign(
            {
            id: this._id,
            email: this.email },
            config.ADMIN_JWT_SECRET,
            {expiresIn: config.ADMIN_JWT_EXPIRY},
            {algorithm: "SHA256"}

            )
    }
}

module.exports = mongoose.model("admin", adminSchema);