const express = require("express");
const router = express.Router();

const {addToCart, getItems, getItemsByUserId, editCart, deleteCartItem, getItemById} = require("../controllers/cartController");
const {loginAuth} = require("../authentication/userAuth");
const {adminAuth} = require("../authentication/adminAuth");

router.post("/addToCart/:productId?/:userId?",loginAuth, addToCart);
router.get("/getItems",adminAuth, getItems);
router.get("/getItemById/:prodId?", loginAuth, getItemById)
router.get("/getItemsByUserId/:userId?",loginAuth, getItemsByUserId);
router.put("/editCart/:productId?/:userId?",loginAuth, editCart);
router.delete("/deleteCartItem/:productId?/:userId?",loginAuth, deleteCartItem);

module.exports = router;

