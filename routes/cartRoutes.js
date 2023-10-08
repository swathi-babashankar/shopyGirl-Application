const express = require("express");
const router = express.Router();

const {addToCart, getItems, getByUserId, editCart, deleteCartItem} = require("../controllers/cartController");
const {loginAuth} = require("../authentication/userAuth");

router.post("/addToCart/:productId/:userId?",loginAuth, addToCart);
router.get("/getItems/:userId",loginAuth, getItems);
router.get("/getByUserId/:userId",loginAuth, getByUserId);
router.put("/editCart/:productId/:userId?",loginAuth, editCart);
router.delete("/deleteCartItem/:productId/:userId?",loginAuth, deleteCartItem);

module.exports = router;

