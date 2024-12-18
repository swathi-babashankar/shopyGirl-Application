const express = require("express");

const { createUser, getUser, getUserAccount, updateUser, deleteUser, userLogin, userLogout } = require("../controllers/userController");
const { loginAuth } = require("../authentication/userAuth");
const router = express.Router();

router.post("/createUser", createUser);
router.get("/getUser/:adminId",loginAuth, getUser);
router.get("/getUserAccount/:id?", loginAuth, getUserAccount);
router.put("/updateUser/:id?",loginAuth, updateUser);
router.delete("/deleteUser/:id?",loginAuth, deleteUser);
router.post("/userLogin", userLogin);
router.get("/userLogout/:id?",loginAuth, userLogout);


module.exports = router;

// Done