const Razorpay = require("razorpay");
const {config} = require("./index");

exports.razorpay = new Razorpay({
    key_id: config.RAZORPAY_API_KEY,
    key_secret: config.RAZORPAY_API_SECRET
})