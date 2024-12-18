const express = require("express");

const {placeOrder, getAllOrders, admingetAllOrders, editOrderDetails, cancelOrder, orderSingleProduct, applyCoupon} = require("../controllers/orderController");
const {loginAuth} = require("../authentication/userAuth");
const {adminAuth} = require("../authentication/adminAuth");
const router = express.Router();

router.post("/placeOrder/:userId?",loginAuth, placeOrder);
router.post("/orderSingleProduct/:userId?/:productId?", loginAuth, orderSingleProduct);
router.get("/applyCoupon/:productId?", applyCoupon);
router.get("/getAllOrders/:userId?",loginAuth, getAllOrders);
router.get("/admingetAllOrders/:adminId?", adminAuth, admingetAllOrders);
router.put("/editOrderDetails/:userId?/:orderId?",loginAuth, editOrderDetails);
router.delete("/cancelOrder/:userId?/:productId?",loginAuth, cancelOrder);

module.exports = router;
// done ;