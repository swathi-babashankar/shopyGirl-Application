const express = require("express")
const app = express()
const cookieParser = require("cookie-parser");
// const {json , urlencoded} = require("express");
const cors = require("cors");
const connectToDatabase = require("./config/database");

const multer = require("multer")
// const bodyParser = require("body-parser")

app.use(function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader("Access-Control-Allow-Credentials", true);
})

app.use(cors({
  'origin': 'https://shopyguysapplicationfrontend.vercel.app',
  'methods': ['GET,PUT,POST,DELETE'],
  'credentials': true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));




app.use(cookieParser());
app.get("/", (req, res) =>{
  res.json({message: "Welcome to my page"})});

const cartRoutes = require("./routes/cartRoutes");
const couponRoutes = require("./routes/couponRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoues = require("./routes/adminRoutes");
// const multer = require("multer");

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//     extended: true
// }))
// app.use(fileUpload({
//     useTempFiles: true
// }))

connectToDatabase();

app.use("/", cartRoutes);
app.use("/", orderRoutes)
app.use("/", productRoutes);
app.use("/", userRoutes);
app.use("/", adminRoues);
app.use("/", couponRoutes)

module.exports = app;
