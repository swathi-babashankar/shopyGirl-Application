const express = require("express");

const {createUser, getUser, updateUser, deleteUser, userLogin, userLogout, isLoggedIn} = require("../controllers/userController");
const router = express.Router();

router.post("/createUser", createUser);
router.get("/getUser/:adminId", isLoggedIn, getUser);
router.put("/updateUser/:id",isLoggedIn, updateUser);
router.delete("/deleteUser/:id",isLoggedIn, deleteUser);
router.post("/userLogin", userLogin);
router.get("/userLogout",isLoggedIn, userLogout);


module.exports = router;

// add admin id in getUser so that only admin can see all the users