const express = require("express");
const router = express.Router();

const {createCoupon, getCoupons, editCoupon, deleteCoupon, deleteExpiredCoupon} = require("../controllers/couponController");
const {isAdminLoggedIn} = require("../controllers/adminController")

// install express-jwt and make these routes protected 
// only admin can create edit and delete coupons so these routes are protected 

router.post("/createCoupon/:adminId?",isAdminLoggedIn, createCoupon);
router.get("/getCoupons/:adminId?", getCoupons);
router.put("/editCoupon/:couponId/:adminId?",isAdminLoggedIn, editCoupon);
router.delete("/deleteCoupon/:couponId/:adminId",isAdminLoggedIn, deleteCoupon);
router.delete("/deleteExpiredCoupon/:couponId/:adminId",isAdminLoggedIn, deleteExpiredCoupon);

module.exports = router;
