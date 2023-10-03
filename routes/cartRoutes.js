const express = require("express");
const router = express.Router();

const {addToCart, getItems, getByUserId, editCart, deleteCartItem} = require("../controllers/cartController");

router.post("/addToCart/:productId/:userId?", addToCart);
router.get("/getItems/:userId", getItems);
router.get("/getByUserId/:userId", getByUserId);
router.put("/editCart/:productId/:userId?", editCart);
router.delete("/deleteCartItem/:productId/:userId?", deleteCartItem);

module.exports = router;

