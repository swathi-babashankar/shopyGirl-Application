const express = require("express");

const {placeOrder, getAllOrders, editOrderDetails, cancelOrder} = require("../controllers/orderController");
const {isLoggedIn} = require("../controllers/userController");
const router = express.Router();

router.post("/placeOrder/:userId?/:productId",isLoggedIn, placeOrder);
router.get("/getAllOrders/:id",isLoggedIn, getAllOrders);
router.put("/editOrderDetails/:id?",isLoggedIn, editOrderDetails);
router.delete("/cancelOrder/:userId?/:productId?",isLoggedIn, cancelOrder);

module.exports = router;
// done 