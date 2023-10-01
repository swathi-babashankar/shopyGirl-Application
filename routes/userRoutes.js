const express = require("express");

const {createUser, getUser, updateUser, deleteUser, userLogin, userLogout} = require("../controllers/userController");
const router = express.Router();

router.post("/createUser", createUser);
router.get("/getUser/:adminId", getUser);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);
router.post("/userLogin", userLogin);
router.get("/userLogout", userLogout);


module.exports = router;

// add admin id in getUser so that only admin can see all the users