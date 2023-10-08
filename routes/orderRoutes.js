const express = require("express");

const {placeOrder, getAllOrders, editOrderDetails, cancelOrder} = require("../controllers/orderController");
const {loginAuth} = require("../authentication/userAuth");
const router = express.Router();

router.post("/placeOrder/:userId?/:productId",loginAuth, placeOrder);
router.get("/getAllOrders/:id",loginAuth, getAllOrders);
router.put("/editOrderDetails/:id?",loginAuth, editOrderDetails);
router.delete("/cancelOrder/:userId?/:productId?",loginAuth, cancelOrder);

module.exports = router;
// done 