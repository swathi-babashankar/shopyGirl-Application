const aws = require("aws-sdk");
const config = require("./index.js");

exports.s3 = new aws.S3({
    accessKeyId: config.S3_KEY,
    secretAccessKey: config.S3_SECRET_KEY,
    region: config.S3_REGION
})



// const Cloudinary = require("cloudinary").v2;
// require("dotenv").config();

// exports.cloudV2 = new Cloudinary.config({
//     cloud_Name: process.env.V2_CLOUD_NAME,
//     api_Key: process.env.API_KEY,
//     api_Secret: process.env.API_SECRET
// })

// exports.storage = new CloudinaryStorage({
//     cloudinary: Cloudinary,
//     params: {
//         folder: "products",
//         format: "png",
//         public_Id: (req, files)=> "unique id"

//     }
// })

// const parser = multer({storage: this.storage});

// module.exports = parser;
