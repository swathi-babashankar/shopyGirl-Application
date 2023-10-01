const express = require("express");
const router = express.Router();
const {createAdmin, editAdmin, adminLogin, adminLogout, deleteAccount} = require("../controllers/adminController");

router.post("/createAdmin", createAdmin);
router.put("/editAdmin/:id", editAdmin);
router.get("/adminLogin", adminLogin);
router.get("/adminLogout", adminLogout);
router.delete("/deleteAccount/:id", deleteAccount);

module.exports = router;