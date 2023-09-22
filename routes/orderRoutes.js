const express = require("express");

const {placeOrder, getAllOrders, editOrderDetails, cancelOrder} = require("../controllers/orderController");
const router = express.Router();

router.post("/placeOrder/:userId?/:productId", placeOrder);
router.get("/getAllOrders/:id", getAllOrders);
router.put("/editOrderDetails/:id?", editOrderDetails);
router.delete("/cancelOrder/:userId?/:productId?", cancelOrder);

module.exports = router;
// done