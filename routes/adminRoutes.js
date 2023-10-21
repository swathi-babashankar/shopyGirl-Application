const express = require("express");
const router = express.Router();
const {createAdmin, editAdmin, adminLogin, adminLogout, deleteAccount} = require("../controllers/adminController");
const {adminAuth} = require("../authentication/adminAuth");

// check if token is admin token and is loggedin later protect thid with express-jwt 
// No other user should be able to create admin except me

router.post("/createAdmin", createAdmin);
router.put("/editAdmin/:id?",adminAuth, editAdmin);
router.post("/adminLogin", adminLogin);
router.get("/adminLogout",adminAuth, adminLogout);
router.delete("/deleteAccount/:id?",adminAuth, deleteAccount);

module.exports = router;