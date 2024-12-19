const cloudinary = require("cloudinary").v2

exports.cloudConfig = cloudinary.config({
    cloud_name: process.env.V2_CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET

})

 