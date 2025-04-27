
const express = require("express")
const app = express()
const cookieParser = require("cookie-parser");
// const {json , urlencoded} = require("express");
const cors = require("cors");
const connectToDatabase = require("../config/database");
const serverless = require("serverless-http");
const router = express.Router();
const multer = require("multer")
// const bodyParser = require("body-parser")

app.use(cors({
  'origin': 'https://shopyguysapplicationfrontend.vercel.app',
  'methods': ['GET,PUT,POST,DELETE'],
  'credentials': true}));

app.use(function(req, res){
  // res.writeHead(200, {'Access-Control-Allow-Origin': 'https://shopyguysapplicationfrontend.vercel.app', 'Access-Control-Allow-Credentials': true})
  res.set({'Access-Control-Allow-Origin': 'https://shopyguysapplicationfrontend.vercel.app', 'Access-Control-Allow-Credentials': true}), 
    // res.setHeader('Access-Control-Allow-Credentials', true);
})
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());
app.get("/api", (req, res) =>{
  try{
    console.log("working");
  res.status(200).json({success:true, message: "working"});
  }
  catch(err){
    console.log("working");
    res.status(400).json({message: err.message});
  }
});
// app.use('/api', router);

const cartRoutes = require("../routes/cartRoutes");
const couponRoutes = require("../routes/couponRoutes");
const orderRoutes = require("../routes/orderRoutes");
const productRoutes = require("../routes/productRoutes");
const userRoutes = require("../routes/userRoutes");
const adminRoutes = require("../routes/adminRoutes");


(async () => {
  try {
    await connectToDatabase();
    console.log("Connected to database");
  } catch (err) {
    console.error("DB connection error:", err);
  }
})();

app.use("/", cartRoutes);
app.use("/", orderRoutes)
app.use("/", productRoutes);
app.use("/", userRoutes);
app.use("/", adminRoutes);
app.use("/", couponRoutes)

module.exports = app;
// export default serverless(app);
// module.exports.handler = async (event, context) => {
//   try {
//     return await serverless(app)(event, context);
//   } catch (err) {
//     console.error('Serverless error:', err);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: 'Internal Server Error (serverless)' })
//     };
//   }
// };
// module.exports = serverless(app);
