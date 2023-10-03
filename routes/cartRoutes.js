const express = require("express");
const router = express.Router();

const {addToCart, getItems, getByUserId, editCart, deleteCartItem} = require("../controllers/cartController");
const {isLoggedIn} = require("../controllers/userController");

router.post("/addToCart/:productId/:userId?",isLoggedIn, addToCart);
router.get("/getItems/:userId",isLoggedIn, getItems);
router.get("/getByUserId/:userId",isLoggedIn, getByUserId);
router.put("/editCart/:productId/:userId?",isLoggedIn, editCart);
router.delete("/deleteCartItem/:productId/:userId?",isLoggedIn, deleteCartItem);

module.exports = router;

