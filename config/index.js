const dotenv = require("dotenv");

dotenv.config();

exports.config = {
JWT_SECRET : process.env.JWT_SECRET,
JWT_EXPIRY: process.env.JWT_EXPIRY || "3h",

ADMIN_JWT_SECRET: process.env.ADMIN_JWT_SECRET,
ADMIN_JWT_EXPIRY: process.env.ADMIN_JWT_EXPIRY ,

MONGODB_URI: process.env.MONGODB_URI,
PORT: process.env.PORT,

V2_CLOUD_NAME: process.env.V2_CLOUD_NAME,
API_KEY: process.env.API_KEY,
API_SECRET: process.env.API_SECRET,
CLOUDINARY_URL: process.env.CLOUDINARY_URL,

RAZORPAY_API_KEY: process.env.RAZORPAY_API_KEY,
RAZORPAY_API_SECRET: process.env.RAZORPAY_API_SECRET

}

// export default config;


