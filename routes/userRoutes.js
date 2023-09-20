const express = require("express");

const {createUser, getUser, updateUser, deleteUser, userLogin, userLogout} = require("../controllers/userController");
const router = express.Router();



module.exports = router;