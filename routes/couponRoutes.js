const express = require("express");
const router = express.Router();

const {createCoupon, getCoupons, editCoupon, deleteCoupon, deleteExpiredCoupon} = require("../controllers/couponController");
const {adminAuth} = require("../authentication/adminAuth");

// install express-jwt and make these routes protected 
// only admin can create edit and delete coupons so these routes are protected 

router.post("/createCoupon/:adminId?",adminAuth, createCoupon);
router.get("/getCoupons", getCoupons);
router.put("/editCoupon/:couponId?/:adminId?",adminAuth, editCoupon);
router.delete("/deleteCoupon/:couponId?/:adminId?",adminAuth, deleteCoupon);
router.delete("/deleteExpiredCoupon/:adminId?",adminAuth, deleteExpiredCoupon);

module.exports = router;
